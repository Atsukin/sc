import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  alternates: { canonical: '/service/' },
};

const services = [
  {
    id: 'energy',
    title: 'エネルギー事業',
    image: '/images/service01_img_new.jpg',
    description:
      '電気を買う時代は終わり自分で作る時代といえます。「太陽光発電システム」の導入はもはや特別なことではありません。また、各地で起こる災害への備えとしても「蓄電池システム」は欠かせません。高騰する電気代の削減、売電価格が下落した太陽光発電システムの有効活用。「太陽光発電システム」「蓄電池システム」で環境への配慮を叫ぶのではありません。家計にエネルギーを与えるべく、どうかご検討をされてください。',
    links: [
      { href: '/solar/', label: '太陽光発電・蓄電池について詳しく見る' },
      { href: '/solar/natori/', label: '名取市で太陽光・蓄電池をご検討の方へ（補助金情報）' },
    ],
  },
  {
    id: 'agriculture',
    title: '農業',
    image: '/images/service02_img_new.jpg',
    description:
      '当社では農業にもエネルギーを注ぎこむことで、人々の暮らしを根底から支えてまいります。毎日の食卓に欠かせない野菜・果物を生産し、たくさんの「美味しい」と笑顔をお届けしたい。',
  },
  {
    id: 'housing',
    title: '住宅',
    image: '/images/service03_img_new.jpg',
    description:
      'ご家族の暮らしの場所を創るうえでの、新築住宅の企画をいたします。お客様一人ひとりのご要望に寄り添いながら、幸せ豊かな空間を創造いたします。',
  },
];

export default function ServicePage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Header variant="light" />

      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mt-10 mb-2">SERVICE</h1>
        <p className="text-xl text-gray-600 mb-12">サービス</p>
        <p className="text-gray-700 mb-16 max-w-2xl">
          株式会社SCではエネルギー・農業・住宅関連と幅広い事業を展開しています。
          これらの事業を通して皆様にエネルギーをお届けいたします。
        </p>

        <div>
          {services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden mb-16 transform hover:scale-105 transition-all duration-300"
            >
              <div className="md:flex md:flex-row-reverse">
                <div className="md:w-2/5 relative h-64 md:h-auto">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {service.links && (
                    <ul className="space-y-2">
                      {service.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="font-bold text-yellow-600 underline hover:text-yellow-500">
                            {link.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
}
