'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  variant?: 'dark' | 'light'
}

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '/', label: 'HOME' },
  { href: '/service/', label: 'SERVICE' },
  { href: '/solar/', label: '太陽光・蓄電池' },
  { href: '/greeting/', label: 'GREETING' },
  { href: '/company/', label: 'COMPANY' },
  { href: '/contact/', label: 'CONTACT' },
]

/** 今いるページか。トップは完全一致、ほかは配下のページ（/solar/natori/ など）も含める */
function isCurrent(pathname: string, href: string): boolean {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  return href === '/' ? path === '/' : path.startsWith(href)
}

export default function Header({ variant = 'dark' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  const isLight = variant === 'light'

  const textColor = isLight ? 'text-gray-800' : 'text-white'
  const headerBg = isLight ? 'bg-white bg-opacity-90' : 'bg-opacity-0'

  // 今いるページは、ロゴのレモン色の下線で示す（白背景でレモン色の文字は読みにくいため、文字色は変えない）
  const linkBase =
    'text-lg font-medium cursor-pointer underline-offset-[10px] decoration-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4'
  const currentLink = 'underline decoration-lemon font-bold'
  const hoverDecoration = 'decoration-lemon'
  const focusOutline = isLight ? 'focus-visible:outline-cell' : 'focus-visible:outline-lemon'

  return (
    <>
      <header className={`${headerBg} backdrop-blur-md p-2 fixed w-full z-50 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-extrabold tracking-wider">
            <Link href="/">
              <img
                src={isLight ? "/images/SC_logo.png" : "/images/logo.png"}
                alt="宮城県名取市の株式会社SCのロゴ_通常"
                className="md:h-24 h-16 cursor-pointer"
              />
            </Link>
          </div>
          <nav aria-label="メインメニュー" className="hidden md:block space-x-8">
            {NAV_ITEMS.map((item) => {
              const current = isCurrent(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  className={`${linkBase} ${textColor} ${focusOutline} ${current ? currentLink : hoverDecoration}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <button
            type="button"
            aria-label="メニューを開く"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${textColor} focus:outline-none focus-visible:outline-2 ${focusOutline}`}
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 motion-reduce:transition-none ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5">
            <button
              type="button"
              aria-label="メニューを閉じる"
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? undefined : -1}
              className="text-white mb-5 focus-visible:outline-2 focus-visible:outline-lemon"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <nav aria-label="メインメニュー（スマホ）" className="flex flex-col items-start space-y-4">
              {NAV_ITEMS.map((item) => {
                const current = isCurrent(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={current ? 'page' : undefined}
                    onClick={() => setIsMenuOpen(false)}
                    tabIndex={isMenuOpen ? undefined : -1}
                    className={`${linkBase} text-white focus-visible:outline-lemon ${current ? currentLink : 'decoration-lemon'}`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
