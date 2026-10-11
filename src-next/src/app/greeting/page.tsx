import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  alternates: { canonical: '/greeting/' },
};

export default function GreetingPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Header variant="light" />

      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mt-10 mb-2">GREETING</h1>
        <p className="text-xl text-gray-600 mb-12">代表挨拶</p>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">地域も人も、エネルギーでみたす</h2>

          <p className="text-gray-600 mb-4">
            この度は株式会社SCのホームページにお越しいただき、ありがとうございます。
          </p>

          <p className="text-gray-600 mb-4">
            元々プロサッカー選手だった私は、引退を機に太陽光発電業界に飛び込みました。
            <br />
            東日本大震災は日の前で起こり、深い悲しみだけでは無く様々な感情をいだき、昨今はコロナ禍の影響で、全世界が未だかつて経験をした事のない苦労に見舞われました。
          </p>

          <p className="text-gray-600 mb-4">
            笑顔が失われ、自信が失われ...
            <br />
            地域も人もエネルギーを失い、本来のあるべき姿ではなくなりました。
          </p>

          <p className="text-gray-600 mb-4">
            私たち株式会社SCでは、再生可能エネルギーの普及は当たり前の事と考え、人々の暮らしを根底から支える多くのサービスを提供し続けてまいります。
            <br />
            地域も人も「エネルギーでみたせ」この理念のもと、真っすぐ前に強く進んで行きます。
          </p>

          <p className="text-gray-600 mb-8">
            これまでもこれからも、関わる全ての人に対して感謝の気持ちを持ち続けながら、地域とそして人とともに、本気の自由な未来へ歩んで参ります。
          </p>

          <div className="text-right">
            <p className="text-gray-800 font-semibold">株式会社SC 代表取締役</p>
            <p className="text-2xl font-bold text-gray-900">千葉 真也</p>
          </div>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
}
