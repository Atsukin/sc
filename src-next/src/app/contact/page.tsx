'use client';

import { useState, FormEvent } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pushToDataLayer } from '@/lib/gtm';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
        // 送信完了ページへの遷移がないため、コンバージョンは dataLayer で通知する
        pushToDataLayer({ event: 'generate_lead', form_name: 'contact' });
      } else {
        console.error('Form submission error:', data.error);
        setSubmitStatus('error');
        pushToDataLayer({ event: 'form_error', form_name: 'contact' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      pushToDataLayer({ event: 'form_error', form_name: 'contact' });
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
              お問い合わせを送信しました。ありがとうございます。
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              送信に失敗しました。もう一度お試しください。
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                電話番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                メッセージ <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer variant="light" />
    </div>
  );
}
