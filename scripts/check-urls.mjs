#!/usr/bin/env node
// 旧サイトと新サイトの URL 照合スクリプト（docs/migration-seo.md「切り替え手順」2〜3）
//
// 使い方:
//   node scripts/check-urls.mjs https://sc-14.net
//   node scripts/check-urls.mjs https://<project>.vercel.app
//   node scripts/check-urls.mjs https://sc-14.net --json > baseline.json   # 比較用に保存
//
// 旧 sitemap と既知の URL について、リダイレクトを追わずに最初の応答（ステータス・Location）を出し、
// そのうえでリダイレクトを追った先のステータス・title・canonical を表で出す。
// 対象の URL は BASE_URL のオリジンに置き換えてアクセスする（*.vercel.app でも同じ一覧を確認できる）。
// 最終的なステータスが 400 以上の URL が1つでもあれば、終了コード 1 で終わる。

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OLD_SITEMAP_FILE = path.join(ROOT, '_archive', 'sitemap.xml');
const MAX_HOPS = 5;
const TIMEOUT_MS = 15_000;

// 旧 sitemap（_archive/sitemap.xml）に載っていた URL。_archive/ は git 管理外なので、ここにも控えておく
const OLD_SITEMAP_FALLBACK = ['/', '/service', '/greeting', '/company', '/contact'];

// 既知の URL。正しい形（末尾スラッシュ付き）と、外部から張られていそうなスラッシュなしの形の両方を確かめる
const KNOWN_PATHS = [
  '/',
  '/service/', '/greeting/', '/company/', '/contact/', '/flow/', '/privacypolicy/',
  '/flow', '/privacypolicy',
  '/index.html',
  '/robots.txt',
  '/sitemap.xml',
  '/google891b49d70596e892.html', // Search Console の所有権確認。消えると確認が外れる
];

function usage() {
  console.error('usage: node scripts/check-urls.mjs <BASE_URL> [--json]');
  process.exit(2);
}

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const baseArg = args.find((a) => !a.startsWith('--'));
if (!baseArg) usage();
let base;
try {
  base = new URL(baseArg);
} catch {
  usage();
}

function loadOldSitemapPaths() {
  if (!fs.existsSync(OLD_SITEMAP_FILE)) return { source: 'fallback', paths: OLD_SITEMAP_FALLBACK };
  const xml = fs.readFileSync(OLD_SITEMAP_FILE, 'utf8');
  const paths = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => {
    const u = new URL(m[1]);
    return u.pathname + u.search;
  });
  return { source: '_archive/sitemap.xml', paths };
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function extractMeta(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .find((tag) => /\brel=["']?canonical["']?/i.test(tag));
  const canonical = canonicalTag?.match(/\bhref=["']([^"']+)["']/i)?.[1];
  const descTag = [...html.matchAll(/<meta\b[^>]*>/gi)]
    .map((m) => m[0])
    .find((tag) => /\bname=["']description["']/i.test(tag));
  const description = descTag?.match(/\bcontent=["']([^"']*)["']/i)?.[1];
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '');
  const clean = (s) => (s == null ? null : decodeEntities(s).replace(/\s+/g, ' ').trim());
  return { title: clean(title), canonical: clean(canonical), description: clean(description), h1: clean(h1) };
}

async function check(pathname) {
  const start = new URL(pathname, base);
  const hops = [];
  let url = start;
  let res;
  for (let i = 0; i <= MAX_HOPS; i++) {
    try {
      res = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { 'user-agent': 'sc-14-url-check/1.0' },
      });
    } catch (err) {
      return { path: pathname, hops, error: err.cause?.code ?? err.name ?? 'fetch failed' };
    }
    const location = res.headers.get('location');
    hops.push({ url: url.href, status: res.status, location });
    if (res.status >= 300 && res.status < 400 && location) {
      await res.body?.cancel();
      url = new URL(location, url);
      continue;
    }
    break;
  }

  const final = hops.at(-1);
  const type = res.headers.get('content-type') ?? '';
  const meta = type.includes('text/html')
    ? extractMeta(await res.text())
    : (await res.body?.cancel(), { title: null, canonical: null, description: null, h1: null });

  return {
    path: pathname,
    status: hops[0].status,
    location: hops[0].location,
    hops: hops.length - 1,
    finalUrl: final.url,
    finalStatus: final.status,
    contentType: type.split(';')[0] || null,
    ...meta,
  };
}

function notes(r) {
  const out = [];
  if (r.error) return [r.error];
  if (r.hops > 1) out.push(`redirect x${r.hops}`);
  if (r.finalStatus >= 400) out.push('NG');
  // ページ（拡張子なしのパス）だけ canonical を確かめる。確認用 HTML などのファイルは対象外
  const isPage = !/\.[^/]+$/.test(new URL(r.finalUrl).pathname);
  if (isPage && r.contentType === 'text/html' && r.finalStatus === 200) {
    if (!r.canonical) out.push('canonical なし');
    else if (r.canonical !== new URL(new URL(r.finalUrl).pathname, 'https://sc-14.net').href) {
      out.push('canonical が最終 URL と不一致');
    }
  }
  return out;
}

function truncate(s, n) {
  if (s == null) return '-';
  return [...s].length > n ? [...s].slice(0, n - 1).join('') + '…' : s;
}

// 全角文字を幅2として列を揃える
function width(s) {
  let w = 0;
  for (const ch of s) w += /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹏＀-｠￠-￦]/.test(ch) ? 2 : 1;
  return w;
}
function pad(s, n) {
  return s + ' '.repeat(Math.max(0, n - width(s)));
}

function printTable(rows) {
  const head = ['source', 'path', 'status', 'location', 'final', 'title', 'canonical', 'note'];
  const body = rows.map((r) => [
    r.source,
    r.path,
    r.error ? 'ERR' : String(r.status),
    r.location ? truncate(r.location.replace(base.origin, ''), 34) : '-',
    r.error ? '-' : String(r.finalStatus),
    truncate(r.title, 28),
    r.canonical ? r.canonical.replace(/^https:\/\/sc-14\.net/, '') || '/' : '-',
    notes(r).join(', ') || 'ok',
  ]);
  const widths = head.map((h, i) => Math.max(width(h), ...body.map((row) => width(row[i]))));
  const line = (cells) => '| ' + cells.map((c, i) => pad(c, widths[i])).join(' | ') + ' |';
  console.log(line(head));
  console.log('|' + widths.map((w) => '-'.repeat(w + 2)).join('|') + '|');
  for (const row of body) console.log(line(row));
}

const old = loadOldSitemapPaths();
const targets = new Map();
for (const p of old.paths) targets.set(p, 'old-sitemap');
for (const p of KNOWN_PATHS) if (!targets.has(p)) targets.set(p, 'known');

const rows = [];
for (const [p, source] of targets) {
  rows.push({ source, ...(await check(p)) });
}

const failed = rows.filter((r) => r.error || r.finalStatus >= 400);

if (asJson) {
  console.log(JSON.stringify({ base: base.origin, checkedAt: new Date().toISOString(), oldSitemap: old.source, rows }, null, 2));
} else {
  console.log(`BASE_URL: ${base.origin}   旧 sitemap: ${old.source}   実行日時: ${new Date().toISOString()}`);
  console.log('canonical は https://sc-14.net を省略して表示。canonical の照合は最終 URL のパスを https://sc-14.net に置いた URL と比べる。\n');
  printTable(rows);
  console.log(`\n${rows.length} 件中 NG ${failed.length} 件`);
}

process.exit(failed.length ? 1 : 0);
