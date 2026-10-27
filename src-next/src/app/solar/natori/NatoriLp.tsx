'use client';

// 名取市 太陽光・蓄電池 LP 本体。元データ: 名取市太陽光補助金LP/src/App.tsx（Figma Make）。
// 見た目と文言はそのまま。移植で変えたのは次の点だけ:
// - ファーストビューの写真を外部 URL から public/images/solar/ に移して next/image で表示
// - 電話リンクに tel_click、/contact/ へのリンクに cta_click の計測を付与（docs/analytics/tracking-plan.md）
// - 最後の「フォームで相談する」を仮の mailto（info@example.com）から /contact/ に変更
// - ロゴのリンクをページ先頭（#）からトップページ（/）に変更し、仮ロゴ（丸に SC）を正式ロゴに差し替え

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';
import { trackEvent, type CtaLocation } from '@/lib/tracking';
import { FAQS, REQUIREMENTS, STEPS, WORRIES } from './lp-content';
import './natori-lp.css';

function telClick(ctaLocation: CtaLocation) {
  trackEvent('tel_click', { cta_location: ctaLocation, link_url: COMPANY.telHref });
}

function PhoneButton({ light = false, ctaLocation }: { light?: boolean; ctaLocation: CtaLocation }) {
  return (
    <a className={`button ${light ? 'button-light' : 'button-primary'}`} href={COMPANY.telHref} onClick={() => telClick(ctaLocation)}>
      <span className="button-kicker">9:00〜21:00 年中無休</span>
      022-354-8345
    </a>
  )
}

function FormButton() {
  return <a className="button button-outline" href="#contact">フォームで相談する <span>→</span></a>
}

function SectionTitle({ eyebrow, children, lead }: { eyebrow: string; children: ReactNode; lead?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  )
}

export default function NatoriLp({ fontClassName }: { fontClassName: string }) {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className={`nlp ${fontClassName}`}>
      <header className="header">
        <div className="topbar">名取市の太陽光発電・蓄電池は、地元の株式会社SCへ</div>
        <div className="nav shell">
          <Link className="logo" href="/"><Image className="logo-img" src="/images/solar/sc-logo.png" alt="株式会社SC" width={480} height={206} preload /><span>株式会社SC<small>SOLAR &amp; STORAGE</small></span></Link>
          <nav><a href="#subsidy">補助金</a><a href="#features">選ばれる理由</a><a href="#flow">導入の流れ</a><a href="#faq">よくある質問</a></nav>
          {/* TODO(要確認) 相談・現地調査が無料か（docs/seo/page-solar-natori.md §4 TODO 3） */}
          <a className="nav-phone" href={COMPANY.telHref} onClick={() => telClick('header')}><small>相談無料</small>022-354-8345</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <Image src="/images/solar/natori-lp-hero.webp" alt="緑に囲まれた住宅" fill preload sizes="100vw" />
          <div className="hero-shade" />
          <div className="shell hero-content">
            <div className="local-chip">宮城県名取市・地域密着</div>
            <p className="hero-note">補助金の確認から、現地調査・施工まで</p>
            <h1>名取市の<br /><strong>太陽光発電・蓄電池</strong>なら<br />地元の株式会社SCへ</h1>
            {/* TODO(要確認) 申請書類の支援の範囲（§4 TODO 1） */}
            <p className="hero-copy">名取市の補助金は「太陽光と蓄電池の同時設置」が対象。<br />手倉田の当社が、申請に必要な書類まで丁寧にご案内します。</p>
            <div className="hero-actions"><PhoneButton light ctaLocation="fv" /><FormButton /></div>
          </div>
          <div className="hero-facts">
            <div><b>10万円</b><span>同時設置の補助額</span></div>
            <div><b>年中無休</b><span>9:00〜21:00受付</span></div>
            <div><b>名取市本社</b><span>現地調査も近くから</span></div>
          </div>
        </section>

        <section className="deadline">
          <div className="shell deadline-inner">
            <div className="deadline-date"><span>設置期限</span><strong>2026.12.31</strong></div>
            <div><h2>令和8年度の補助金、今から間に合うかお早めにご相談ください</h2><p>太陽光は電力受給開始まで完了したものが対象です。工事・電力会社の手続き期間を見込む必要があります。</p></div>
            {/* TODO(要確認) 「無料」（§4 TODO 3） */}
            <a href="#contact">無料で確認する →</a>
          </div>
        </section>

        <section className="section soft">
          <div className="shell">
            <SectionTitle eyebrow="YOUR CONCERNS" lead="名取市に本社を置く当社が、地域の制度と住環境に合わせてご案内します。">こんなお悩みはありませんか？</SectionTitle>
            <div className="worry-grid">
              {WORRIES.map((item, i) => <div className="worry" key={item}><span>{String(i + 1).padStart(2, '0')}</span><p>{item}</p></div>)}
            </div>
          </div>
        </section>

        <section className="section" id="subsidy">
          <div className="shell narrow">
            <SectionTitle eyebrow="NATORI CITY SUBSIDY" lead="令和8年度 名取市住宅用再生可能エネルギー等設備導入補助金">名取市の補助金をわかりやすく</SectionTitle>
            <p className="updated">2026年10月9日時点｜先着順・予算に達し次第終了</p>
            <div className="amount-cards">
              <article><span>太陽光 ＋ 蓄電池</span><p>同時に設置</p><strong><small>1件あたり</small>10<em>万円</em></strong></article>
              <article><span>定置用蓄電池</span><p>太陽光設備と接続</p><strong><small>1件あたり</small>6<em>万円</em></strong></article>
            </div>
            <div className="eligibility">
              <div className="eligible"><h3><span>○</span>対象になる</h3><ul><li>太陽光と定置用蓄電池を同時設置</li><li>既存パネルへの増設＋蓄電池を新設</li><li>太陽光と接続する定置用蓄電池</li><li>購入した設備で、書類の名義が同じ</li></ul></div>
              <div className="not-eligible"><h3><span>×</span>対象にならない</h3><ul><li>太陽光発電だけの設置</li><li>リース・PPAなどの契約</li><li>対象期間外に設置した設備</li></ul></div>
            </div>
            <h3 className="subhead">申請前に知っておきたい5つの条件</h3>
            <div className="requirements">
              {REQUIREMENTS.map((r, i) => <article key={r[1]}><div className="req-number">{i + 1}</div><div><span>{r[0]}</span><h4>{r[1]}</h4><p>{r[2]}</p></div></article>)}
            </div>
            <div className="source-note">最新の受付状況は名取市 環境共創課（022-724-7159）へご確認ください。</div>
          </div>
        </section>

        <section className="section prefecture">
          <div className="shell">
            <SectionTitle eyebrow="MIYAGI PREFECTURE">宮城県の補助金もチェック</SectionTitle>
            <div className="mini-table">
              <div><span>太陽光発電</span><small>蓄エネ設備併設タイプ</small><b>3万円</b></div>
              <div><span>蓄電池</span><small>対象設備に限る</small><b>4万円</b></div>
              <div><span>V2H</span><small>EVと住宅をつなぐ設備</small><b>4万円</b></div>
            </div>
            <p className="center-note">名取市の補助金との併用可否も、当社へご相談ください。</p>
          </div>
        </section>

        <section className="section timeline-section" id="flow">
          <div className="shell">
            <SectionTitle eyebrow="SCHEDULE" lead="名取市は事後申請。電力受給開始が期限に間に合うかが大切です。">ご相談から補助金の入金まで</SectionTitle>
            <div className="timeline">
              {STEPS.map((step, i) => <div className={i === 5 ? 'key-step' : ''} key={step}><span>{i + 1}</span><b>{step}</b>{i === 5 && <small>12/31まで</small>}</div>)}
            </div>
            <div className="dates">
              <div><span>設置・電力受給開始</span><strong>2026年12月31日</strong></div>
              <div><span>名取市への申請締切</span><strong>2027年2月1日</strong></div>
            </div>
          </div>
        </section>

        <section className="cta-strip">
          {/* TODO(要確認) 「専門スタッフ」と言える体制か（§4 TODO 15） */}
          <div className="shell"><div><small>補助金の対象？ 今から間に合う？</small><h2>まずは名取市の専門スタッフへご相談ください</h2></div><PhoneButton light ctaLocation="middle" /><FormButton /></div>
        </section>

        <section className="section" id="features">
          <div className="shell">
            <SectionTitle eyebrow="LOCAL KNOWLEDGE" lead="名取市の気候・土地の特徴を踏まえて、適切な機器と施工をご提案します。">名取市で設置するときのポイント</SectionTitle>
            <div className="point-grid">
              <article><div className="point-icon">01</div><h3>日照と雪</h3><p>太平洋側で冬も晴れる日が比較的多い一方、発電量は屋根の向き・角度・周辺の影で変わります。現地調査で丁寧に確認します。</p></article>
              <article><div className="point-icon">02</div><h3>沿岸部の塩害</h3><p>閖上・下増田・北釜など海に近い地域では、海岸からの距離による機種や保証条件を確認して選定します。</p></article>
              <article><div className="point-icon">03</div><h3>屋根と住宅の状態</h3><p>築年数に応じて屋根の傷みや防水状態を確認。新築の場合はZEH関連制度もあわせて確認します。</p></article>
            </div>
          </div>
        </section>

        <section className="section disaster">
          <div className="shell disaster-grid">
            <div>
              <p className="eyebrow">DISASTER PREPAREDNESS</p>
              <h2>停電時も、<br />いつもの暮らしに電気を。</h2>
              {/* TODO(要確認) 浸水想定を踏まえた設置場所の提案を実際にしているか（§4 TODO 12） */}
              <p>太陽光と蓄電池があれば、昼は発電した電気を、夜はためた電気を使えます。名取市のハザードマップも確認し、浸水想定区域では設置場所を検討します。</p>
            </div>
            <div className="load-cards">
              <article><span>全負荷型</span><h3>家全体へ電気を送る</h3><p>照明　●　冷蔵庫　●<br />テレビ ●　コンセント ●</p></article>
              <article><span>特定負荷型</span><h3>必要な回路だけに送る</h3><p>照明　●　冷蔵庫　●<br />テレビ －　コンセント －</p></article>
            </div>
          </div>
        </section>

        <section className="section reasons">
          <div className="shell">
            <SectionTitle eyebrow="WHY SC">名取市の株式会社SCが選ばれる理由</SectionTitle>
            <div className="reason-grid">
              <article><b>01</b><h3>名取市手倉田に本社</h3><p>現地調査や設置後のアフターも、近くから迅速に伺えます。</p></article>
              <article><b>02</b><h3>年中無休で受付</h3><p>お電話は毎日9:00〜21:00。お仕事後のご相談にも対応します。</p></article>
              <article><b>03</b><h3>まとめてご提案</h3><p>太陽光・蓄電池・補助金の条件をまとめてわかりやすくご説明します。</p></article>
            </div>
            <div className="address">〒981-1231 宮城県名取市手倉田字諏訪357-2</div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="shell narrow">
            <SectionTitle eyebrow="FAQ">よくある質問</SectionTitle>
            <div className="faq-list">
              {FAQS.map((faq, i) => (
                <article className={openFaq === i ? 'open' : ''} key={faq.question}>
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>Q</span>{faq.question}<b>{openFaq === i ? '−' : '+'}</b></button>
                  {openFaq === i && <div className="answer"><span>A</span><p>{faq.answer}</p></div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="shell contact-box">
            {/* TODO(要確認) 「FREE」「無料」（§4 TODO 3）と「専門スタッフ」（§4 TODO 15） */}
            <p className="eyebrow">FREE CONSULTATION</p>
            <h2>名取市の太陽光発電・蓄電池<br />まずは無料でご相談ください</h2>
            <p>補助金を使えるか、期限に間に合うか、見積もりは妥当か。地域の専門スタッフがお答えします。</p>
            <div className="contact-actions">
              <PhoneButton light ctaLocation="bottom" />
              <Link
                className="button button-white"
                href="/contact/"
                onClick={() => trackEvent('cta_click', { cta_type: 'contact_page', cta_location: 'bottom', cta_text: 'フォームで相談する' })}
              >
                フォームで相談する <span>→</span>
              </Link>
            </div>
            <small>電話受付 9:00〜21:00 年中無休　｜　フォームは24時間受付</small>
          </div>
        </section>
      </main>

      <footer><div className="shell"><div className="logo footer-logo"><Image className="logo-img" src="/images/solar/sc-logo-white.png" alt="" width={480} height={207} /><span>株式会社SC<small>SOLAR &amp; STORAGE</small></span></div><p>〒981-1231 宮城県名取市手倉田字諏訪357-2</p><p>© 2025 株式会社SC All Rights Reserved.</p></div></footer>
      <div className="mobile-bar"><a href={COMPANY.telHref} onClick={() => telClick('fixed_footer')}>電話で相談</a><a href="#contact">フォーム相談</a></div>
    </div>
  )
}
