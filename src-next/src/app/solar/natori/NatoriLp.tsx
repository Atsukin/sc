'use client';

// 名取市 太陽光・蓄電池 LP 本体。デザインは案 D3-1「白帯」（docs/design/proposals/natori-v4/d3-1.html）。
// 文言の元は Figma Make 版（2026-11-20 に先方確認済み: docs/release-solar-natori.md §1）。
// 写真はすべて仮置き（docs/assets/image-credits.md）。施工事例・当社施工のようには見せない。
// 計測: 電話リンクに tel_click、/contact/ へのリンクに cta_click（docs/analytics/tracking-plan.md）。

import Image from 'next/image';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';
import { trackEvent, type CtaLocation } from '@/lib/tracking';
import { FAQS, REQUIREMENTS, STEPS, WORRIES } from './lp-content';
import './natori-lp.css';

function telClick(ctaLocation: CtaLocation) {
  trackEvent('tel_click', { cta_location: ctaLocation, link_url: COMPANY.telHref });
}

function TelLink({ location, className, children }: { location: CtaLocation; className?: string; children: React.ReactNode }) {
  return <a className={className} href={COMPANY.telHref} onClick={() => telClick(location)}>{children}</a>;
}

function FormLink({ location, className, children }: { location: CtaLocation; className?: string; children: string }) {
  return (
    <Link
      className={className}
      href="/contact/"
      onClick={() => trackEvent('cta_click', { cta_type: 'contact_page', cta_location: location, cta_text: children })}
    >
      {children}
    </Link>
  );
}

// 流れのうち、期限にかかわる段（電力受給開始）。最後の段（補助金の入金）は黒で示す
const KEY_STEP = 5;

export default function NatoriLp({ fontClassName }: { fontClassName: string }) {
  return (
    <div className={`nlp ${fontClassName}`}>
      <header className="header">
        <div className="wrap">
          <Link className="logo" href="/"><Image src="/images/solar/sc-logo.png" alt="株式会社SC" width={480} height={206} preload /></Link>
          <nav aria-label="ページ内"><a href="#subsidy">補助金</a><a href="#flow">導入の流れ</a><a href="#reasons">選ばれる理由</a><a href="#faq">よくある質問</a></nav>
          <TelLink location="header" className="tel"><small>相談無料・{COMPANY.hours}</small>{COMPANY.tel}</TelLink>
        </div>
      </header>

      <main>
        <section className="fv">
          <div className="wrap">
            <h1>名取市の太陽光発電・蓄電池</h1>
            <p className="lead"><span>屋根で、つくる。</span><br /><span>家に、ためる。</span></p>
            <div className="row">
              <div>
                <p className="body">昼につくった電気を蓄電池にためて、夜や停電のときに使う。名取市の補助金は、太陽光と蓄電池を一緒に設置すると対象になります。手倉田の当社が、申請に必要な書類まで丁寧にご案内します。</p>
                <div className="actions">
                  <FormLink location="fv" className="btn">補助金の対象か相談する</FormLink>
                  <TelLink location="fv" className="phone">電話で相談 {COMPANY.tel}</TelLink>
                </div>
                <div className="fv-facts">
                  <div><b>10万円</b><span>同時設置の補助額</span></div>
                  <div><b>年中無休</b><span>9:00〜21:00 受付</span></div>
                  <div><b>手倉田に本社</b><span>現地調査も近くから</span></div>
                </div>
              </div>
              {/* ロゴの菱形を4本の45度の帯に切ったもの。2本が写真（仮置き）、黒と黄が1本ずつ */}
              <svg className="strips" viewBox="0 0 1000 480" aria-hidden="true">
                <defs>
                  <clipPath id="nlp-s1"><polygon points="480,0 1000,0 886,114 366,114" /></clipPath>
                  <clipPath id="nlp-s3"><polygon points="236,244 756,244 642,358 122,358" /></clipPath>
                </defs>
                <g className="s"><image href="/images/solar/panels-dark.webp" x="300" y="-200" width="760" height="520" preserveAspectRatio="xMidYMid slice" clipPath="url(#nlp-s1)" /></g>
                <polygon className="s" fill="#040000" points="358,122 878,122 764,236 244,236" />
                <g className="s"><image href="/images/solar/house-modern.webp" x="100" y="150" width="680" height="300" preserveAspectRatio="xMidYMid slice" clipPath="url(#nlp-s3)" /></g>
                <polygon className="s" fill="#F5E528" points="114,366 634,366 520,480 0,480" />
              </svg>
            </div>
          </div>
        </section>

        <section className="deadline" aria-label="設置の期限">
          <div className="wrap">
            <b>2026.12.31</b>
            <p>令和8年度の補助金は、この日までの設置・電力受給開始が対象です。工事と電力会社の手続きの期間を見込んで、お早めに。</p>
            <a href="#contact">無料で確認する</a>
          </div>
        </section>

        <section className="section worries">
          <div className="wrap">
            <h2 className="sec-title">こんなことで、<br />迷っていませんか。</h2>
            <ul>
              {WORRIES.map((w, i) => <li key={w} className="band" style={{ '--i': i } as React.CSSProperties}>{w}</li>)}
            </ul>
          </div>
        </section>

        <section className="section subsidy" id="subsidy">
          <div className="wrap">
            <div className="grid">
              <div>
                <h2 className="sec-title">名取市の補助金</h2>
                <p className="sec-lead">令和8年度 名取市住宅用再生可能エネルギー等設備導入補助金。設置が終わってから申請する事後申請で、先着順です。</p>
              </div>
              <dl className="nums">
                <div className="num"><dt>太陽光＋蓄電池<small>同時に設置・1件あたり</small></dt><dd><b>10</b><span>万円</span></dd></div>
                <div className="num small"><dt>定置用蓄電池<small>太陽光と接続・1件あたり</small></dt><dd><b>6</b><span>万円</span></dd></div>
              </dl>
            </div>
            <p className="updated">2026年11月20日時点。予算に達した時点で受付が終わります。</p>
          </div>
        </section>

        <section className="section" aria-labelledby="nlp-conditions" style={{ paddingTop: 72 }}>
          <div className="wrap">
            <div className="eligibility">
              <div className="ok"><h3>対象になる</h3><ul><li>太陽光と定置用蓄電池を同時に設置</li><li>既存パネルへの増設と、蓄電池の新設</li><li>太陽光と接続する定置用蓄電池</li><li>購入した設備で、書類の名義が同じ</li></ul></div>
              <div className="ng"><h3>対象にならない</h3><ul><li>太陽光発電だけの設置</li><li>リース・PPAなどの契約</li><li>対象期間外に設置した設備</li></ul></div>
            </div>
            <div className="conditions">
              <h3 id="nlp-conditions">申請前に知っておきたい5つの条件</h3>
              <ul>
                {REQUIREMENTS.map(([tag, title, body]) => (
                  <li key={title} className={tag === '対象外' ? '' : 'must'}><span className="tag">{tag}</span><h4>{title}</h4><p>{body}</p></li>
                ))}
              </ul>
              <p className="note">最新の受付状況は、名取市 環境共創課（022-724-7159）にご確認ください。</p>
            </div>
          </div>
        </section>

        <section className="pref" aria-labelledby="nlp-pref">
          <div className="wrap">
            <h2 className="sec-title" id="nlp-pref">宮城県の補助金</h2>
            <dl>
              <div className="band"><dt>太陽光発電<small>蓄エネ設備併設タイプ</small></dt><dd>3<small>万円</small></dd></div>
              <div className="band"><dt>蓄電池<small>対象設備に限る</small></dt><dd>4<small>万円</small></dd></div>
              <div className="band"><dt>V2H<small>EVと住宅をつなぐ設備</small></dt><dd>4<small>万円</small></dd></div>
            </dl>
            <p className="note">名取市の補助金と併用できるかも、あわせてご相談ください。</p>
          </div>
        </section>

        <section className="section" id="flow">
          <div className="wrap">
            <h2 className="sec-title">ご相談から、<br />補助金の入金まで。</h2>
            <p className="sec-lead">名取市は事後申請です。電力受給開始が期限に間に合うかが大切です。</p>
            <ol className="steps">
              {STEPS.map((step, i) => (
                <li key={step} className={`band ${i === KEY_STEP ? 'key' : ''} ${i === STEPS.length - 1 ? 'goal' : ''}`} style={{ '--i': i } as React.CSSProperties}>
                  {step}{i === KEY_STEP && <small>12/31まで</small>}
                </li>
              ))}
            </ol>
            <div className="dates">
              <div><span>設置・電力受給開始</span><b>2026年12月31日</b></div>
              <div><span>名取市への申請締切</span><b>2027年2月1日</b></div>
            </div>
          </div>
        </section>

        <section className="cta" aria-label="ご相談">
          <div className="wrap">
            <div><small>補助金の対象？ 今から間に合う？</small><h2>まずは名取市の専門スタッフへご相談ください。</h2></div>
            <FormLink location="middle" className="btn">フォームで相談する</FormLink>
            <TelLink location="middle" className="phone">{COMPANY.tel}</TelLink>
          </div>
        </section>

        <section className="section points" aria-labelledby="nlp-points">
          <div className="wrap">
            <h2 className="sec-title" id="nlp-points">名取市で設置するときの<br />ポイント</h2>
            <p className="sec-lead">名取市の気候と土地の特徴を踏まえて、機器と施工をご提案します。</p>
            <ol>
              <li><div className="pic"><Image src="/images/solar/panels-blue-sky.webp" alt="晴れた空と太陽光パネル（イメージ）" fill sizes="(max-width: 960px) 100vw, 400px" /></div><h3>日照と雪</h3><p>太平洋側で冬も晴れる日が比較的多い一方、発電量は屋根の向き・角度・周りの影で変わります。現地調査で丁寧に確認します。</p></li>
              <li><div className="pic"><Image src="/images/solar/coast-town.webp" alt="海に近い町（イメージ）" fill sizes="(max-width: 960px) 100vw, 400px" /></div><h3>沿岸部の塩害</h3><p>閖上・下増田・北釜など海に近い地域では、海岸からの距離による機種や保証の条件を確認して選定します。</p></li>
              <li><div className="pic"><Image src="/images/solar/japanese-roof.webp" alt="住宅の屋根（イメージ）" fill sizes="(max-width: 960px) 100vw, 400px" /></div><h3>屋根と住宅の状態</h3><p>築年数に応じて、屋根の傷みや防水の状態を確認します。新築の場合は ZEH 関連の制度もあわせて確認します。</p></li>
            </ol>
          </div>
        </section>

        <section className="section backup" aria-labelledby="nlp-backup">
          <div className="wrap">
            <svg viewBox="0 0 800 520" role="img" aria-label="停電の夜（イメージ）">
              <defs>
                <clipPath id="nlp-b"><polygon points="520,0 800,0 630,170 350,170" /><polygon points="345,175 625,175 455,345 175,345" /><polygon points="170,350 450,350 280,520 0,520" /></clipPath>
              </defs>
              <image href="/images/solar/blackout-candle.webp" x="0" y="0" width="800" height="520" preserveAspectRatio="xMidYMid slice" clipPath="url(#nlp-b)" />
              <polygon fill="#F5E528" points="635,175 800,175 630,345 465,345" />
            </svg>
            <div>
              <h2 className="sec-title" id="nlp-backup">停電の夜も、<br />いつもの明かりを。</h2>
              <p className="body">太陽光と蓄電池があれば、昼は発電した電気を、夜はためた電気を使えます。停電のときに電気を送れる範囲は、蓄電池の種類で変わります。名取市のハザードマップも確認し、浸水想定区域では設置場所を検討します。</p>
              <table className="loads">
                <thead><tr><td /><th scope="col">全負荷型<small>家全体へ送る</small></th><th scope="col">特定負荷型<small>決めた回路へ送る</small></th></tr></thead>
                <tbody>
                  <tr><th scope="row">照明</th><td className="y">●</td><td className="y">●</td></tr>
                  <tr><th scope="row">冷蔵庫</th><td className="y">●</td><td className="y">●</td></tr>
                  <tr><th scope="row">テレビ</th><td className="y">●</td><td className="n" aria-label="送れない">－</td></tr>
                  <tr><th scope="row">コンセント</th><td className="y">●</td><td className="n" aria-label="送れない">－</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section reasons" id="reasons">
          <div className="wrap">
            <h2 className="sec-title">名取市の株式会社SCが<br />選ばれる理由</h2>
            <ol>
              <li><h3>名取市手倉田に本社</h3><p>現地調査や設置後のアフターも、近くから迅速に伺えます。</p></li>
              <li><h3>年中無休で<br />電話受付</h3><p>お電話は毎日9:00〜21:00。お仕事後のご相談にも対応します。</p></li>
              <li><h3>補助金の条件まで<br />まとめてご提案</h3><p>太陽光・蓄電池・補助金の条件を、まとめてわかりやすくご説明します。</p></li>
            </ol>
            <p className="address">{COMPANY.addressText}</p>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="wrap">
            <h2 className="sec-title">よくある質問</h2>
            <div>
              {FAQS.map((faq, i) => (
                <details key={faq.question} open={i === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="wrap">
            <h2>名取市の太陽光発電・蓄電池、<br />まずは無料でご相談ください。</h2>
            <div className="row">
              <p>補助金を使えるか、期限に間に合うか、見積もりは妥当か。地域の専門スタッフがお答えします。</p>
              <div>
                <TelLink location="bottom" className="tel-big">{COMPANY.tel}</TelLink>
                <small>電話 {COMPANY.hours} ／ フォームは24時間受付</small>
                <div className="actions"><FormLink location="bottom" className="btn">フォームで相談する</FormLink></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <Image src="/images/solar/sc-logo-white.png" alt="株式会社SC" width={480} height={207} />
          <span>{COMPANY.addressText}</span>
          <span>© 株式会社SC</span>
        </div>
      </footer>
      <nav className="mobile-bar" aria-label="ご相談">
        <TelLink location="fixed_footer">電話で相談</TelLink>
        <FormLink location="fixed_footer">フォームで相談</FormLink>
      </nav>
    </div>
  );
}
