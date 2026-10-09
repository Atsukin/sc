'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
  variant?: 'dark' | 'light'
}

export default function Header({ variant = 'dark' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isLight = variant === 'light'

  const textColor = isLight ? 'text-gray-800' : 'text-white'
  const activeColor = 'text-[#D4E157]'
  const headerBg = isLight ? 'bg-white bg-opacity-90' : 'bg-opacity-0'

  return (
    <>
      <header className={`${headerBg} backdrop-blur-md p-2 fixed w-full z-50 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-extrabold text-[#D4E157] tracking-wider">
            <Link href="/">
              <img
                src={isLight ? "/images/SC_logo.png" : "/images/logo.png"}
                alt="宮城県名取市の株式会社SCのロゴ_通常"
                className="md:h-24 h-16 cursor-pointer"
              />
            </Link>
          </div>
          <nav className="hidden md:block space-x-8">
            <Link href="/">
              <span className={`hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer ${activeColor}`}>
                HOME
              </span>
            </Link>
            <Link href="/service">
              <span className={`hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer ${textColor}`}>
                SERVICE
              </span>
            </Link>
            <Link href="/greeting">
              <span className={`hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer ${textColor}`}>
                GREETING
              </span>
            </Link>
            <Link href="/company">
              <span className={`hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer ${textColor}`}>
                COMPANY
              </span>
            </Link>
            <Link href="/contact">
              <span className={`hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer ${textColor}`}>
                CONTACT
              </span>
            </Link>
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${textColor} focus:outline-none`}
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
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white mb-5"
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
            <nav className="flex flex-col space-y-4">
              <Link href="/">
                <span className="hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer text-[#D4E157]">
                  HOME
                </span>
              </Link>
              <Link href="/service">
                <span className="hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer text-white">
                  SERVICE
                </span>
              </Link>
              <Link href="/greeting">
                <span className="hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer text-white">
                  GREETING
                </span>
              </Link>
              <Link href="/company">
                <span className="hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer text-white">
                  COMPANY
                </span>
              </Link>
              <Link href="/contact">
                <span className="hover:text-[#D4E157] transition duration-300 text-lg font-medium cursor-pointer text-white">
                  CONTACT
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
