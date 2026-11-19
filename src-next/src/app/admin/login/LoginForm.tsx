'use client';

import { useActionState } from 'react';
import { signIn, type SignInState } from '../actions';

const field = 'mt-1 block w-full border border-[#C9CCD0] bg-white px-3 py-2.5 text-base focus:border-[#040000] focus:outline-none focus:ring-2 focus:ring-[#F5E528]';

export default function LoginForm() {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});

  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">
        メールアドレス
        <input name="email" type="email" autoComplete="username" required defaultValue={state.email} className={field} />
      </label>
      <label className="block text-sm font-medium">
        パスワード
        <input name="password" type="password" autoComplete="current-password" required className={field} />
      </label>
      {state.error && (
        <p role="alert" className="border-l-4 border-[#C62828] bg-[#FDECEC] px-3 py-2 text-sm text-[#8E1B1B]">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#040000] py-3 font-bold text-white hover:bg-[#2b2727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#040000] disabled:opacity-60"
      >
        {pending ? 'ログインしています…' : 'ログイン'}
      </button>
    </form>
  );
}
