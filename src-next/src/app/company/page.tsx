import Header from '@/components/Header';
import Footer from '@/components/Footer';

const companyInfo = [
  { label: '本社', value: '株式会社SC' },
  { label: '代表者名', value: '千葉 真也' },
  { label: '住所', value: '〒981-1231 宮城県名取市手倉田字諏訪357-2' },
  { label: '電話番号', value: '022-354-8345' },
  { label: 'FAX', value: '022-354-8346' },
  { label: 'メールアドレス', value: 'info@sc-14.net' },
  { label: '営業時間', value: '年中無休 9:00〜21:00（現場作業については相談必要）' },
];

const churaumiInfo = [
  { label: '支店', value: '美ら海支店' },
  { label: '代表者名', value: '千葉 真也' },
  { label: '住所', value: '〒901-2227 沖縄県宜野湾市宇地泊1丁目7-20-2F' },
  { label: '電話番号', value: '022-354-8345' },
  { label: 'FAX', value: '022-354-8346' },
  { label: 'メールアドレス', value: 'info@sc-14.net' },
  { label: '営業時間', value: '年中無休 9:00〜21:00（現場作業については相談必要）' },
];

export default function CompanyPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Header variant="light" />

      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mt-10 mb-2">COMPANY</h1>
        <p className="text-xl text-gray-600 mb-12">会社概要</p>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <table className="w-full">
            <tbody>
              {companyInfo.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 font-semibold text-gray-600 w-1/3">{item.label}</td>
                  <td className="py-4 text-gray-800">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-16">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3136.766619714059!2d140.87450049999998!3d38.168863099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8a240b26e21d03%3A0xcccb0ece747727ed!2z44CSOTgxLTEyMzEg5a6u5Z-O55yM5ZCN5Y-W5biC5omL5YCJ55Sw6KuP6Kiq77yT77yV77yX4oiS77yS!5e0!3m2!1sja!2sjp!4v1725727162554!5m2!1sja!2sjp"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">美ら海支店</h2>
        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <table className="w-full">
            <tbody>
              {churaumiInfo.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 font-semibold text-gray-600 w-1/3">{item.label}</td>
                  <td className="py-4 text-gray-800">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-16">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://maps.google.com/maps?q=%E6%B2%96%E7%B8%84%E7%9C%8C%E5%AE%9C%E9%87%8E%E6%B9%BE%E5%B8%82%E5%AE%87%E5%9C%B0%E6%B3%8A1%E4%B8%81%E7%9B%AE7-20&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
}
