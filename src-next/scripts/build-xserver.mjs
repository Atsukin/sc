// Xserver 向けの静的書き出し（out/）。Vercel 移行が済んだらこのスクリプトごと消す。
// サーバーで動く部分（API ルート・管理画面・proxy）は静的書き出しではビルドが通らないため、
// ビルド中だけ src の外へ退避する。Xserver では問い合わせは旧 PHP（/api/contact.php）が受ける。
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, renameSync, rmdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const stash = join(root, ".xserver-stash");
const serverOnly = ["src/app/api", "src/app/admin", "src/proxy.ts"];
const stashPath = (p) => join(stash, p.replaceAll("/", "__"));

if (existsSync(stash)) {
  console.error(`${stash} が残っています。前回のビルドが途中で止まった可能性があります。中身を元の場所（${serverOnly.join("、")}）に戻してから再実行してください。`);
  process.exit(1);
}

rmSync(join(root, "out"), { recursive: true, force: true });
mkdirSync(stash);
const moved = [];
let status = 1;
try {
  for (const p of serverOnly) {
    if (!existsSync(join(root, p))) continue;
    renameSync(join(root, p), stashPath(p));
    moved.push(p);
  }
  const result = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  status = result.status ?? 1;
} finally {
  for (const p of moved) renameSync(stashPath(p), join(root, p));
  rmdirSync(stash); // 空のときだけ消える。戻し損ねたファイルがあれば消さずに残す
}
process.exit(status);
