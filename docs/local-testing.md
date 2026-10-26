# ローカル確認用リンク

## 起動
```
cd src-next
npm run dev
```
起動ログの `Local:`（PC 用）と `Network:`（同じ Wi‑Fi のスマホ用）の URL を使う。
`Network:` の IP アドレスは接続しているネットワークによって変わる。

## ページ
| ページ | PC | スマホ（同じ Wi‑Fi、IP は起動ログに合わせて書き換える） |
|---|---|---|
| 名取市の太陽光・蓄電池（メイン） | http://localhost:3000/solar/natori/ | http://10.200.108.43:3000/solar/natori/ |
| 太陽光・蓄電池（入口） | http://localhost:3000/solar/ | http://10.200.108.43:3000/solar/ |
| トップ | http://localhost:3000/ | http://10.200.108.43:3000/ |
| サービス | http://localhost:3000/service/ | http://10.200.108.43:3000/service/ |
| 会社概要 | http://localhost:3000/company/ | http://10.200.108.43:3000/company/ |
| ご挨拶 | http://localhost:3000/greeting/ | http://10.200.108.43:3000/greeting/ |
| 導入の流れ | http://localhost:3000/flow/ | http://10.200.108.43:3000/flow/ |
| お問い合わせ | http://localhost:3000/contact/ | http://10.200.108.43:3000/contact/ |
| プライバシーポリシー | http://localhost:3000/privacypolicy/ | http://10.200.108.43:3000/privacypolicy/ |
| サイトマップ | http://localhost:3000/sitemap.xml | — |
| robots.txt | http://localhost:3000/robots.txt | — |

## 確認すること

### /solar/natori/
- [ ] ヘッダーで「太陽光・蓄電池」に下線が付いている
- [ ] 期限の帯（黄色と黒のストライプ）の文字が読める
- [ ] 補助金の表の金額（10万円・6万円）と出典のリンクが開く
- [ ] FAQ が開閉できる
- [ ] 電話ボタンをスマホでタップすると発信画面になる（PC では何も起きなくてよい）
- [ ] 「フォームで相談する」で /contact/ に移動する
- [ ] スマホで画面下に「電話する｜フォームで相談」の追従バーが出る

### 共通
- [ ] スマホのメニュー（右上の三本線）が開き、各ページに移動できる
- [ ] トップの「エネルギー事業」のスライドから /solar/ に移動する
- [ ] /service/ のエネルギー事業から /solar/ と /solar/natori/ に移動する

### お問い合わせ（注意）
- ローカルでは `.env.local`（SMTP の接続情報）がないため、送信するとエラーになる。これは想定どおり
- 本番（Xserver）では旧 PHP 経由で送信されるので、ローカルの結果は本番の挙動を表さない

### 計測（GTM のプレビューで確認する場合）
- GTM の管理画面で「プレビュー」を開き、http://localhost:3000/solar/natori/ を入力する
- 電話ボタンで `tel_click`、フォームボタンで `cta_click` が出ることを確かめる
