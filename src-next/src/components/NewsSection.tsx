'use client'

import { useEffect } from 'react'

interface NewsItem {
  id: number
  date: string
  title: string
  description: string
  images: string[]
  link?: string
  linkText?: string
  logoBackground?: string
}

export default function NewsSection() {
  const newsItems: NewsItem[] = [
    {
      id: 11,
      date: '2026.08.21',
      title: '少年少女サッカー大会 in Jヴィレッジ',
      description: '昨年に引き続き、8月15日〜16日の2日間にわたり、福島県のJ-VILLAGEにて少年少女サッカー大会の主催をいたしました。連日ともに熱い戦いが繰り広げられ、今年は晴れ間が少なかった東北の夏ではありましたが、子供達にとって良い思い出になったのではないでしょうか。',
      images: [
        '/images/0821/soccer_news_001.jpg',
        '/images/0821/soccer_news_002.jpg',
        '/images/0821/soccer_news_003.jpg',
        '/images/0821/soccer_news_004.jpg',
        '/images/0821/soccer_news_005.jpg',
        '/images/0821/soccer_news_006.jpg'
      ]
    },
    {
      id: 10,
      date: '2026.08.11',
      title: 'お盆期間中の営業のお知らせ',
      description: '平素は格別のご高配を賜り、誠にありがとうございます。お盆期間中（8月13日〜8月16日）も休まず営業いたします。お問い合わせ・ご相談はいつでもお気軽にお寄せください。',
      images: ['/images/SC_logo.png'],
      logoBackground: '#fff'
    },
    {
      id: 0,
      date: '2026.05.16',
      title: '名取市消防本部より感謝状',
      description: '弊社代表取締役 千葉が名取市消防本部から感謝状をいただきました。先日、本社を構える名取市にて火災による災害が発生しました。その際の救助活動が高く評価されました。今後も安全で安心な暮らしのために、弊社は地域と共に歩んでまいります。',
      images: [
        '/images/0516/S__476471299_0.jpg',
        '/images/0516/S__476471300_0.jpg',
        '/images/0516/S__476471301_0.jpg'
      ],
      logoBackground: '#fff'
    },
    {
      id: 1,
      date: '2026.05.09',
      title: 'アクアプラネット',
      description: 'NPO法人「アクアプラネット」を応援しております。売上げの一部を珊瑚再生活動に寄付をすることで、今後も持続可能な社会の実現に貢献します。',
      images: [
        '/images/0509/S__475635734_0.jpg',
        '/images/0509/S__475635731_0.jpg',
        '/images/0509/S__475635732_0.jpg',
        '/images/0509/S__475635733_0.jpg'
      ],
      logoBackground: '#fff'
    },
    {
      id: 2,
      date: '2026.05.08',
      title: 'FC琉球',
      description: 'サッカーJ3リーグ「FC琉球」を応援しております。先日の美ら海支店開設に続き、私達は今後もあらゆる人と地域をエネルギーでみたし続けて参ります。',
      images: [
        '/images/0509/S__475635729_0.jpg',
        '/images/0509/S__475635730_0.jpg'
      ]
    },
    {
      id: 3,
      date: '2026.05.04',
      title: 'はてな 沖縄本店',
      description: '油そば専門店「はてな 沖縄本店」を5月20日にオープンします。私たちは私たちの可能性を信じ、あらゆる事業にチャレンジをして参ります。沖縄県のみなさま、沖縄県にお越しのみなさま、是非お立ち寄り下さい。',
      images: ['/images/SC_logo.png'],
      link: 'https://www.instagram.com/hatena_okinawahonten?igsh=NWoyYzhlcXZ0YTcy',
      linkText: '詳しく見る',
      logoBackground: '#fff'
    },
    {
      id: 4,
      date: '2026.04.28',
      title: 'コバルトーレ女川',
      description: '東北社会人サッカーリーグ「コバルトーレ女川」を応援しております。震災復興から上を目指すチームとともに、私たちも日々努力をして参ります。',
      images: ['/images/SC_logo.png'],
      link: 'https://cobaltore.com/',
      linkText: '詳しく見る',
      logoBackground: '#fff'
    },
    {
      id: 5,
      date: '2026.04.21',
      title: 'apex.skills.football',
      description: '全国を拠点とするサッカーマンツーマン指導「apex.skills.football」の運営をスタートしました。現役選手のサポートを含め、各地域でサッカー選手を夢見る子供達、多くの人々の力になれるよう全力で応援をして参ります。',
      images: ['/images/SC_logo.png'],
      link: 'https://www.instagram.com/apex.skills.football?igsh=eXVpMXZ1aTdnZmZn',
      linkText: '詳しく見る',
      logoBackground: '#fff'
    },
    {
      id: 6,
      date: '2025.08.28',
      title: '増田西SSS杯',
      description: '少年少女サッカー大会である「増田西SSS杯」を主催いたしました。未来を担う子供たちが、日頃の練習の成果を発揮し、勝つ喜びも負ける悔しさも感じながらも、皆が最後まで諦めずにボールを追いかけ、一生懸命プレイする姿に、私たちも元気を貰いました。私達は今後も、子供たちの明るい未来の為にと想い、活動を続けて参ります。',
      images: ['/images/sc_news_1.jpg', '/images/sc_news_2.jpg', '/images/sc_news_3.jpg', '/images/sc_news_4.jpg', '/images/sc_news_5.jpg'],
      logoBackground: '#fff'
    },
    {
      id: 7,
      date: '2025.02.01',
      title: 'Jヴィレッジ',
      description: 'ナショナルトレーニングセンター「Jヴィレッジ」を応援しております。',
      images: ['/images/jvillage-logo.png', '/images/sc-jvillage.jpg'],
      link: 'https://j-village.jp/',
      linkText: '詳しく見る',
      logoBackground: '#fff'
    },
    {
      id: 8,
      date: '2024.12.18',
      title: 'Super Chill',
      description: 'ブランド名を「Super Chill」と題して、苺の栽培事業を行っております。今シーズンの栽培もスタートをしました。クリスマスには皆様にお届け出来ますよう、心を込めて作業に取り組んで参ります。販売サイトは以下のリンクからご覧いただけます。',
      images: [
        '/images/SuperChill_logo.png',
        '/images/itigo1.jpg',
        '/images/itigo2.jpg',
        '/images/itigo3.jpg',
        '/images/itigo4.jpg'
      ],
      link: 'https://ichigosuperchill.com/',
      linkText: '詳しく見る',
      logoBackground: '#333333cc'
    },
    {
      id: 9,
      date: '2024.06.26',
      title: 'さんご畑',
      description: '陸上の珊瑚養殖を行う「さんご畑」を応援しています。「さんご畑」は世界初、陸上での珊瑚養殖を成功させた施設です。「エネルギーでみたせ」この理念を軸に、今後も様々な活動を行い、人に地域に貢献をし続けて参ります。',
      images: ['/images/sango.jpg'],
      link: 'https://www.seaseed.com/coral-farm',
      linkText: '詳しく見る'
    }
  ]

  useEffect(() => {
    // Swiper initialization
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
    script.async = true
    document.body.appendChild(script)

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
    document.head.appendChild(link)

    script.onload = () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.Swiper) {
        // @ts-ignore
        new window.Swiper('.mySwiper', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        })
      }
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-6xl font-bold mb-24 text-center text-white tracking-wide">
        NEWS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-[#D4E157] transform hover:-translate-y-2 hover:scale-105"
          >
            {item.images.length > 1 ? (
              <div className="swiper mySwiper">
                <div className="swiper-wrapper">
                  {item.images.map((image, index) => (
                    <div
                      key={index}
                      className="swiper-slide"
                      style={{ background: index === 0 && item.logoBackground ? item.logoBackground : undefined }}
                    >
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full bg-cover bg-center rounded-lg shadow-lg h-60 md:h-80 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  backgroundImage: `url(${item.images[0]})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
                className="w-full md:h-80 h-60 bg-cover bg-bottom rounded-lg"
              />
            )}
            <div className="mt-8">
              <span className="text-[#D4E157] font-semibold text-xl">
                {item.date}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-white">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 bg-[#D4E157] text-white px-6 py-2 rounded-full transition duration-300 flex items-center justify-center w-40 mx-auto hover:bg-[#c4d147]"
                >
                  {item.linkText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
