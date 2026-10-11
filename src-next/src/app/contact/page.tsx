import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Header variant="light" />

      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-6xl md:text-8xl font-bold text-yellow-400 mt-10 mb-2">CONTACT</h1>
        <p className="text-xl text-gray-600 mb-12">お問い合わせ</p>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-black">電話でのお問い合わせ</h2>
          <p className="text-3xl font-bold text-yellow-400 mb-2">Tel. 022-354-8345</p>
          <p className="text-gray-600">※営業時間はお問い合わせください。</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-black">メールフォームでのお問い合わせ</h2>
          <ContactForm />
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
}
