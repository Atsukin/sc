"use client";

export default function InfoSection() {
  const newsItems = [
    {
      date: "2026.08.21",
      content:
        "昨年に引き続き、8月15日〜16日の2日間にわたり、福島県のJ-VILLAGEにて少年少女サッカー大会の主催をいたしました。\n\n連日ともに熱い戦いが繰り広げられ、今年は晴れ間が少なかった東北の夏ではありましたが、子供達にとって良い思い出になったのではないでしょうか。",
    },
    {
      date: "2026.08.11",
      content:
        "•お盆期間中の営業のお知らせ\n平素は格別のご高配を賜り、誠にありがとうございます。\n\nお盆期間中（8月13日〜8月16日）も休まず営業いたします。",
    },
    {
      date: "2026.05.16",
      content:
        "弊社代表取締役 千葉が名取市消防本部から感謝状をいただきました。\n先日、本社を構える名取市にて火災による災害が発生しました。\nその際の救助活動が高く評価されました。\n\n今後も安全で安心な暮らしのために、弊社は地域と共に歩んでまいります。",
    },
    {
      date: "2026.05.09",
      content:
        "NPO法人「アクアプラネット」を応援しております。売上げの一部を珊瑚再生活動に寄付をすることで、今後も持続可能な社会の実現に貢献します。",
    },
    {
      date: "2026.05.08",
      content:
        "サッカーJ3リーグ「FC琉球」を応援しております。先日の美ら海支店開設に続き、私達は今後もあらゆる人と地域をエネルギーでみたし続けて参ります。",
    },
    {
      date: "2026.05.04",
      content:
        "油そば専門店「はてな 沖縄本店」を5月20日にオープンします。\n私たちは私たちの可能性を信じ、あらゆる事業にチャレンジをして参ります。\n沖縄県のみなさま、沖縄県にお越しのみなさま、是非お立ち寄り下さい。",
    },
    {
      date: "2026.04.28",
      content:
        "東北社会人サッカーリーグ「コバルトーレ女川」を応援しております。\n震災復興から上を目指すチームとともに、私たちも日々努力をして参ります。",
    },
    {
      date: "2026.04.21",
      content:
        "全国を拠点とするサッカーマンツーマン指導「apex.skills.football」の運営をスタートしました。\n現役選手のサポートを含め、各地域でサッカー選手を夢見る子供達、多くの人々の力になれるよう全力で応援をして参ります。",
    },
    {
      date: "2026.02.06",
      content:
        "•美ら海支店オープンのお知らせ\n\n太陽光発電システム、蓄電池システム普及への取り組みはもちろんのこと、新たな事業へのチャレンジにて更なる地域社会への貢献を考え、沖縄県に「美ら海支店」を開設しました。\n\n「エネルギーでみたせ」\n\n人も地域もエネルギーでみたし続けて参ります。\n\n株式会社SC\n美ら海支店\n〒901-2227 沖縄県宜野湾市宇地泊1-7-20 2F",
    },
    {
      date: "2025.12.27",
      content:
        "•年末年始のお知らせ\n平素は格別のご高配を賜り、誠にありがとうございます。\n\n年末年始も休まず営業いたします。\nお問い合わせをお待ちしております。",
    },
    {
      date: "2025.08.28",
      content:
        "「増田西SSS杯」を主催しました。",
    },
    {
      date: "2025.02.01",
      content:
        "ナショナルトレーニングセンター「Jヴィレッジ」を応援しております。",
    },
    {
      date: "2024.12.23",
      content:
        "•年末年始のお知らせ\n平素は格別のご高配を賜り、誠にありがとうございます。\n\n年末年始も休まず営業いたします。\nお問い合わせをお待ちしております。",
    },
    {
      date: "2024.09.18",
      content:
        "苺栽培事業も行っております。今シーズンの栽培もスタートをしました。",
    },
    {
      date: "2024.06.26",
      content: "陸上の珊瑚養殖を行う「さんご畑」を応援しています。",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#121212] via-[#1E1E1E] to-[#222222] text-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左カラム */}
          <div className="space-y-8">
            <div
              style={{
                backgroundImage: "url('/images/service01_img_new.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg relative h-64"
            >
              <div className="absolute inset-0 bg-opacity-10 flex items-center"></div>
              <div style={{ zIndex: 999 }} className="p-4">
                <span className="text-[#FFF] text-sm">#SERVICES</span>
                <h4 className="text-lg font-semibold mt-1 text-white">
                  エネルギー事業
                </h4>
              </div>
            </div>
            <div
              style={{
                backgroundImage: "url('/images/service02_img_new.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg relative h-64"
            >
              <div className="absolute inset-0 bg-opacity-10"></div>
              <div className="p-4">
                <span className="text-[#D4E157] text-sm">#SERVICES</span>
                <h4 className="text-lg font-semibold mt-1 text-white">農業</h4>
              </div>
            </div>
          </div>

          {/* 中央カラム */}
          <div className="space-y-8 md:block flex flex-col-reverse">
            <div
              style={{ overflowY: "scroll" }}
              className="bg-gray-900 rounded-lg p-6 h-64 md:mt-0 mt-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#FFFFFF]">NEWS</h3>
              <ul className="space-y-4">
                {newsItems.map((item, index) => (
                  <li key={index}>
                    <span className="block text-[#D4E157]">{item.date}</span>
                    <p className="text-gray-300 whitespace-pre-line">
                      {item.content}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                backgroundImage: "url('/images/service03_img_new.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg relative h-64 md:space-y-6"
            >
              <div className="absolute inset-0 bg-opacity-10"></div>
              <div className="p-4">
                <span className="text-[#D4E157] text-sm">#SERVICES</span>
                <h4 className="text-lg font-semibold mt-1 text-gray-200">
                  住宅
                </h4>
              </div>
            </div>
          </div>

          {/* 右カラム */}
          <div className="space-y-8">
            <div className="bg-transparent rounded-lg overflow-hidden shadow-lg p-6 h-64 md:block hidden">
              <img
                src="/images/SC_logo_white.png"
                alt="宮城県名取市の株式会社SCのロゴ_通常"
                className="w-full"
              />
              <p className="text-xl font-bold mt-4 text-right text-[#fff]">
                エネルギーを与える会社
              </p>
            </div>
            <div
              style={{
                backgroundImage: "url('/images/top_content02-1_img.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg relative h-64"
            >
              <div className="absolute inset-0 bg-opacity-0"></div>
              <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                <span className="text-[#D4E157] text-sm">#MESSAGE</span>
                <h4 className="text-lg font-semibold mt-1 text-white">
                  CEOメッセージ
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
