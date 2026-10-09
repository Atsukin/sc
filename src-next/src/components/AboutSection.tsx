'use client'

export default function AboutSection() {
  return (
    <section className="bg-black text-white py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 opacity-10"></div>
      <div className="absolute inset-0 opacity-5">
        <div
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
          className="w-full h-full"
        ></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="md:text-5xl text-3xl font-bold mb-16 text-center leading-tight text-white font-zen-old-mincho">
          エネルギーを与える会社
        </h2>
        <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-80 md:p-12 p-6 rounded-3xl shadow-2xl backdrop-blur-md border border-yellow-500/30">
          <p className="md:text-2xl text-lg text-gray-200 leading-relaxed mb-8 font-noto-sans">
            株式会社SCは宮城県名取市に本社を構え、東北エリアを中心に事業を展開しています。
          </p>
          <p className="md:text-2xl text-lg text-gray-200 leading-relaxed mb-8 font-noto-sans">
            業界での圧倒的な実績を収めるとともに、多くの経験と知識を積み重ねてきました。
            その中で構築してきた各取引先との協力関係を更に活かし、地域やそこに住まう人たちに沢山のエネルギーを与えること。
          </p>
          <p className="md:text-2xl text-lg text-gray-200 leading-relaxed mb-8 font-noto-sans">
            それが当社の想いです。
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
    </section>
  )
}
