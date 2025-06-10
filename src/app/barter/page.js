"use client";
import Navbar from "../components/Navbar";
// Image artık kullanılmayacak, kaldırıldı.
import Head from "next/head";
// ArrowLeft, ArrowRight artık kullanılmayacak, kaldırıldı.
import { useRef, useEffect } from "react";

export default function Barter() {
  // containerRef artık videonun referansı olarak kullanılmayacak, kaldırabiliriz
  // ama videonun kapsayıcısını referans almak isterseniz bırakabilirsiniz.
  // const containerRef = useRef(null);

  // slides array'i artık gerekli değil, kaldırıldı.
  // const slides = [ ... ];

  // scrollTo fonksiyonu artık gerekli değil, kaldırıldı.
  // const scrollTo = (direction) => { ... };

  // Otomatik slayt geçişi useEffect'i artık gerekli değil, kaldırıldı.
  // useEffect(() => { ... }, []);

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
        {/* Favicon linkini buraya da ekleyebilirsiniz, genel layout'ta varsa gerek yok */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen relative text-white">
        {/* Arka Plan */}
        <div className="absolute inset-0 z-0">
          {/* bg35.jpg imajını koruyalım, bu arka plan görüntüsü */}
          <img
            src="/bg35.jpg" // Next/image yerine standart img kullanıyoruz ya da Next/image'ı import edip kullanmaya devam edebilirsiniz.
            alt="background"
            layout="fill" // Eğer next/image kullanıyorsanız fill kullanın
            objectfit="cover" // Eğer next/image kullanıyorsanız objectFit kullanın
            className="w-full h-full object-cover" // Standart img için w-full h-full ve object-cover
          />
          <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
        </div>

        <Navbar />

        {/* Ana İçerik */}
        <div className="relative z-10 mt-48 px-4 sm:px-16 flex justify-center">
          {/* Video Oynatıcı */}
          <div
            className="relative w-full max-w-5xl h-[400px] sm:h-[550px] rounded-xl overflow-hidden shadow-xl"
            // containerRef artık gerekli değilse kaldırılabilir
          >
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline // iOS gibi cihazlarda tam ekran olmadan oynatılması için
              preload="auto" // Videonun mümkün olduğunca erken yüklenmesini sağlar
            >
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>

          {/* Ok Butonları kaldırıldı */}
        </div>
      </div>
    </>
  );
}