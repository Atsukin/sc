'use client';

import { useRef, useState, FormEvent } from 'react';
import Script from 'next/script';
import { pushToDataLayer } from '@/lib/gtm';

// Cloudflare Turnstile。サイトキーが設定されているときだけウィジェットを出す。
// サーバー側は TURNSTILE_SECRET_KEY があるときだけ検証するので、両方を同時に設定すること。
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void; 'error-callback': () => void },
  ) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const initialForm = { name: '', phone: '', email: '', message: '' };
const inputClass =
  'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileIdRef = useRef<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const renderTurnstile = () => {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !turnstileRef.current) return;
    if (turnstileIdRef.current) window.turnstile.remove(turnstileIdRef.current);
    turnstileIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: setTurnstileToken,
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    });
  };

  const resetTurnstile = () => {
    if (turnstileIdRef.current) window.turnstile?.reset(turnstileIdRef.current);
    setTurnstileToken('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
          ...(TURNSTILE_SITE_KEY ? { turnstileToken } : {}),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (response.ok) {
        setSubmitStatus('success');
        setFormData(initialForm);
        // 送信完了ページへの遷移がないため、コンバージョンは dataLayer で通知する
        pushToDataLayer({ event: 'generate_lead', form_name: 'contact' });
      } else {
        setErrorMessage(data.error ?? '');
        setSubmitStatus('error');
        pushToDataLayer({ event: 'form_error', form_name: 'contact' });
      }
    } catch {
      setSubmitStatus('error');
      pushToDataLayer({ event: 'form_error', form_name: 'contact' });
    } finally {
      // Turnstile のトークンは1回しか使えないので、成否にかかわらず取り直す
      resetTurnstile();
      setIsSubmitting(false);
    }
  };

  const waitingTurnstile = Boolean(TURNSTILE_SITE_KEY) && !turnstileToken;

  return (
    <>
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          お問い合わせを送信しました。ありがとうございます。
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {errorMessage || '送信に失敗しました。もう一度お試しください。'}
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
            maxLength={100}
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
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
            maxLength={20}
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
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
            maxLength={254}
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
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
            maxLength={5000}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`${inputClass} h-32`}
          />
        </div>

        {/* honeypot: 人間には見えない項目。ボットが埋めたらサーバー側で破棄する */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {TURNSTILE_SITE_KEY && (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="afterInteractive"
              onReady={renderTurnstile}
            />
            <div ref={turnstileRef} className="mb-6 flex justify-center" />
          </>
        )}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting || waitingTurnstile}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </button>
        </div>
      </form>
    </>
  );
}
