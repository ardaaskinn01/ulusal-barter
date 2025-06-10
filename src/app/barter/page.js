"use client";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { useRef, useEffect } from "react"; // useRef ve useEffect'i koruyoruz

export default function Barter() {
  const videoSrc = "/10.mp4"; // Video dosyanızın yolu

  return (
    <>
      <Head>
        <title>Barter Sistemi | ULUSAL BARTER A.Ş.</title>
        <meta
          name="description"
          content="Ulusal Barter Finans A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli."
        />
        <meta property="og:title" content="Barter Sistemi | ULUSAL BARTER A.Ş." />
        <meta
          property="og:description"
          content="Ürün ve hizmetlerinizi takas yöntemiyle değerlendirin"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen relative text-white">
        {/* Arka Plan */}
        <div className="absolute inset-0 z-0">
          <img
            src="/bg35.jpg"
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
        </div>

        <Navbar />

        {/* Ana İçerik - Düzen değiştirildi */}
        {/* mt-48: Navbar'dan aşağıya doğru boşluk bırakır */}
        {/* px-4 sm:px-16: Kenar boşlukları */}
        {/* flex flex-col items-center: İçerikleri dikey hizalar ve ortalar */}
        <div className="relative z-10 mt-48 px-4 sm:px-16 flex flex-col items-center">
          {/* Video Oynatıcı */}
          {/* mb-8: Video ile yazı alanları arasında boşluk bırakır */}
          <div
            className="relative w-full max-w-5xl h-[220px] sm:h-[550px] rounded-xl overflow-hidden shadow-xl mb-8"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>

          {/* Yazı Alanları - Video'nun altında olacak */}
          {/* Bu div'in kendi genişliğini max-w-5xl gibi bir sınıfla da kısıtlayabilirsiniz */}
          <div className="space-y-10 w-full max-w-5xl"> {/* w-full ve max-w-5xl ekledim */}
            <Section
              title="Neden Ulusal Barter Finans A.Ş.?"
              content={`Çünkü biz sadece bir ticaret platformu değiliz; değerin döndüğü, işletmelerin kazandığı sürdürülebilir bir sistem inşa ediyoruz.

Ulusal ölçekte kurduğumuz geniş barter ağı ve güvenilir işlem yapısı sayesinde, firmalarımıza nakitsiz büyüme imkânı sunuyoruz.

Ulusal Barter Finans A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli.`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, content }) {
    return (
        <section className="relative p-0 sm:p-0">
            {/* Saydam beyaz arka plan + blur */}
            <div className="backdrop-blur-sm bg-white/10 p-6 sm:p-10 rounded-xl border border-white/20">
                <h2 className="text-3xl font-semibold text-yellow-600 mb-5 relative inline-block">
                    {title}
                    {/* Alt çizgi efekti */}
                    <span className="absolute left-0 -bottom-1 h-1 w-24 bg-yellow-600 rounded-full opacity-80"></span>
                </h2>
                <p className="text-white leading-relaxed whitespace-pre-line text-lg tracking-wide">
                    {content}
                </p>
            </div>
        </section>
    );
}