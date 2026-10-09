interface FooterProps {
  variant?: 'dark' | 'light'
}

export default function Footer({ variant = 'dark' }: FooterProps) {
  const isLight = variant === 'light'

  return (
    <footer className={`${isLight ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-white'} text-center md:p-16 p-8`}>
      <p className="text-lg">© 2025 株式会社SC All Rights Reserved.</p>
    </footer>
  )
}
