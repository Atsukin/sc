import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const steps = [
  {
    number: '01',
    title: 'お問い合わせ',
    description:
      'まずは、当社まで一度お問い合わせください。お問い合わせは、当社のメールフォームにて承ります。お急ぎの方は直接、お電話しても良い日時をお聞かせください。',
    hasLink: true,
  },
  {
    number: '02',
    title: '現地調査',
    description:
      'お約束の日時に、当社スタッフが現地調査にお伺いします。急病や体調不良などでキャンセルされる場合、事前にご連絡ください。',
  },
  {
    number: '03',
    title: '打ち合わせ',
    description:
      '現地調査が終わりましたら、打ち合わせで環境やご要望をお聞きします。イメージや理想の近いものなどから、可能な限り正確かつ細かくお伝えください。',
  },
  {
    number: '04',
    title: 'お見積もり',
    description:
      '打ち合わせの内容をもとに、お見積もりを提出させていただきます。ご提案内容に納得いただければ、契約成立となります。',
  },
  {
    number: '05',
    title: '設計・着工',
    description:
      '契約後もちろん、施工への準備が行います。施工中でも気になる点や不明な点がありましたら、お気軽にお尋ねください。',
  },
  {
    number: '06',
    title: '完了',
    description:
      '施工が完了しましたら、お客様とご一緒に最終確認となります。お客様に寄り添った対応を心掛けておりますので、何かお気づきの点などございましたらお声がけください。',
  },
];

export default function FlowPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Header variant="light" />

      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mt-10 mb-2">FLOW</h1>
        <p className="text-xl text-gray-600 mb-12">導入の流れ</p>

        <div className="space-y-16">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-lg shadow-xl p-8 relative">
              <div className="absolute top-0 left-0 bg-yellow-400 text-white text-2xl font-bold py-2 px-4 rounded-tl-lg rounded-br-lg">
                STEP.{step.number}
              </div>
              <h2 className="text-3xl font-bold mb-4 mt-8 text-gray-800">{step.title}</h2>
              <p className="text-gray-600 mb-4">{step.description}</p>
              {step.hasLink && (
                <Link href="/contact">
                  <span className="inline-block bg-yellow-400 text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-300">
                    お問い合わせはこちら
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
}
