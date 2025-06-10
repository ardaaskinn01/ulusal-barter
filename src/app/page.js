"use client";
import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { useRef } from 'react';

import { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import { CheckCircle, Handshake, CreditCard, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';


const useSectionAnimation = (setStartCountUp) => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');

          if (entry.target.classList.contains('stats-section')) {
            setStartCountUp(true);
            const counters = entry.target.querySelectorAll('.count-up-trigger');
            counters.forEach(counter => {
              counter.classList.add('animate-fadeInUp');
            });
          }
        }
      });
    }, { threshold: 0.3 });

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [setStartCountUp]);

  return sectionRefs;
};


export default function Home() {
  const [startCountUp, setStartCountUp] = useState(false);
  const sectionRef = useRef(null);
  const instanceRef = useRef(null);
  const sectionRefs = useSectionAnimation(setStartCountUp);
  const [currentBg, setCurrentBg] = useState(0);
  const [animatedText1, setAnimatedText1] = useState("");
  const [animatedText2, setAnimatedText2] = useState("");

  const videoSrc = '/11.mp4';
  const backgrounds = [
    '/bg21.jpg',
    '/bg20.jpg',
    '/bg03.jpg'
  ];
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 1,
        },
      },
    },
  });

  const images = ['2.png', '3.png', '8.png', '11.png'];
  const containerRef = useRef(null);
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const q = query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (error) {
        console.error("Ürünler alınırken hata:", error);
      }
    };

    fetchRecentProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 4000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <>
      {/* Head import'unu eklemeyi unutmayın */}
      <head>
        <title>ULUSAL BARTER A.Ş.</title>
        <meta name="description" content="Ulusal Barter A.Ş. - Türkiye'nin en güvenilir barter platformu. Ürün ve hizmetlerinizi takas yoluyla değerlendirin." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <div className="min-h-screen flex flex-col relative bg-gray-950">
        {/* Navbar import'unu eklemeyi unutmayın */}
        <Navbar />

        <section
          className="pt-32 md:pt-40 h-screen flex items-center justify-center text-center px-6 bg-gray-100 relative overflow-hidden"
        // containerRef, onMouseDown, onMouseMove vb. artık gerekli değil, kaldırıldı
        >
          {/* Video Oynatıcı Alanı */}
          <div className="relative w-full max-w-5xl h-[280px] sm:h-[550px] mx-auto rounded-xl overflow-hidden">
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

            {/* Yazılar ve arka plan karartması videonun üstünde */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4 rounded-xl">
              <h1 className="text-center mb-6">
                <span className="block text-4xl md:text-6xl font-medium leading-tight mb-4 bg-clip-text text-transparent bg-yellow-500">
                  {animatedText1}
                  {animatedText1.length < "Barter Yatırımın Güvencesi:".length && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
                <span className="block text-5xl md:text-7xl font-bold">
                  {animatedText2}
                  {animatedText1 === "Barter Yatırımın Güvencesi:" && animatedText2.length < "Ulusal Güç, Yerel Çözüm!".length && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
                <div
                  className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-1000 delay-1000 scale-x-0 origin-left"
                  style={{
                    animation: animatedText2 === "Ulusal Güç, Yerel Çözüm!" ? 'scaleIn 1s forwards' : ''
                  }}
                />
              </h1>

              <p
                className="text-lg font-light opacity-0"
                style={{
                  animation: animatedText2 === "Ulusal Güç, Yerel Çözüm!" ? 'fadeIn 1s forwards 0.5s' : ''
                }}
              >
                ULUSAL BARTER
              </p>
            </div>
          </div>

          {/* Slider kontrol noktaları kaldırıldı */}
        </section>

        <section
          ref={el => sectionRefs.current[0] = el}
          className="w-full py-20 min-h-[500px] relative overflow-hidden opacity-0 translate-y-10 transition-all duration-500 bg-gray-200"
        >
          {/* Arkaplan efektleri */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute inset-0 bg-gray-200"></div>
            <div className="absolute top-1/4 right-20 w-80 h-80 bg-yellow-600 rounded-full filter blur-[100px] opacity-5 animate-float"></div>
            <div className="absolute bottom-1/3 left-20 w-96 h-96 bg-indigo-600 rounded-full filter blur-[120px] opacity-5 animate-float-delay"></div>
          </div>

          {/* İçerik container - Yatay düzen için flex */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 h-full flex items-center">
            <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-12">

              {/* Sol taraf - Başlık ve ana mesaj */}
              <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-600 tracking-tight leading-tight">
                    <span className="block">Ulusal Barter A.Ş.</span>
                    <span className="text-yellow-500">Nakitin Ötesinde</span>
                  </h1>
                  <div className="w-24 h-1 bg-yellow-500 rounded-full lg:mx-0 mx-auto"></div>
                </div>

                <p className="text-xl md:text-2xl text-gray-600 font-medium">
                  Yenilikçi barter yatırım sistemiyle işletmeler için nakitsiz ticaretin güçlü altyapısı
                </p>

                <p className="text-lg text-yellow-500 italic font-medium">
                  &quot;Yalnızca bugününüzü değil, yarınınızı da birlikte inşa ediyoruz&quot;
                </p>
              </div>

              {/* Sağ taraf - Açıklama metni */}
              <div className="lg:w-1/2 lg:pl-8 lg:border-l lg:border-gray-700">
                <div className="space-y-6">
                  <p className="text-base md:text-lg leading-relaxed text-gray-600 text-justify">
                    Türkiye&apos;nin önde gelen barter platformu olarak, işletmelerin değer üreten yönlerini öne çıkarıyor ve nakit sıkışıklığı yaşamadan büyümelerini sağlıyoruz. Ulusal Barter A.Ş. olarak, geleneksel finans sistemlerinin ötesinde çözümler sunuyoruz.
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <Handshake className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>Nakit dışı ticaret imkanı</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>Geniş iş ağı</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CreditCard className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>Esnek ödeme çözümleri</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ShieldCheck className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>Güvenli altyapı</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Animasyon stilleri */}
          <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-20px) translateX(10px); }
    }
    .animate-float {
      animation: float 8s ease-in-out infinite;
    }
    .animate-float-delay {
      animation: float 10s ease-in-out 2s infinite;
    }
  `}</style>
        </section>



        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className="relative z-10 py-16 bg-gray-100 px-4 md:px-8 flex flex-col items-center"
        >
          {/* Başlık */}
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-yellow-500">
            Barter Sistemiyle Tanışın!
          </h2>

          {/* Slider */}
          <div className="w-full max-w-4xl mb-8">
            <div
              ref={sliderRef}
              className="keen-slider h-[300px] md:h-[500px] rounded-xl overflow-hidden"
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="keen-slider__slide flex items-center justify-center"
                >
                  <img
                    src={`/${img}`}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Oklar */}
          <div className="flex justify-between w-full max-w-4xl absolute top-1/2 left-0 right-0 mx-auto px-4 -translate-y-1/2">
            <button
              onClick={() => slider.current?.prev()}
              className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
              style={{ width: "2rem", height: "2rem" }}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => slider.current?.next()}
              className="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition"
              style={{ width: "2rem", height: "2rem" }}
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Buton */}
          <a
            href="/barter"
            className="mt-8 bg-yellow-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-700 transition inline-block"
          >
            Daha Fazlasını Gör
          </a>
        </section>

        <section
          ref={el => sectionRefs.current[2] = el}
          className="w-full py-20 min-h-[400px] relative overflow-hidden bg-neutral-200 opacity-0 translate-y-10 transition-all duration-500"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-24 text-white">
            <h2 className="text-3xl font-bold mb-10 text-center text-yellow-500">Son Eklenen İlanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-gray-500 bg-opacity-90 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={product.anaGorselUrl || "/placeholder.jpg"}
                    alt={product.isim}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-yellow-500 mb-2">{product.isim}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/uyelik"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
              >
                Üye Ol ve Hepsini Gör
              </a>
            </div>
          </div>
        </section>

        <section
          ref={el => sectionRefs.current[3] = el}
          className="w-full py-16 min-h-[300px] relative bg-gray-100"
        >
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0 rounded-xl"
              style={{ backgroundImage: "url('/bg07.jpg')" }}
            >
              <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
            </div>

            {/* İçerik alanı */}
            <div className="relative z-10 bg-white bg-opacity-40 rounded-xl shadow-lg p-6 md:p-10 space-y-10">
              {/* Başlık */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Neden Bizi Seçmelisiniz?
                </h2>
                <div className="w-24 h-1 bg-amber-400 mx-auto mt-4"></div>
              </div>

              {/* Grid kart listesi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "💸",
                    text: "Nakit harcamadan büyüme fırsatı"
                  },
                  {
                    icon: "📦",
                    text: "Stokları değere dönüştüren sistem"
                  },
                  {
                    icon: "🗺️",
                    text: "Türkiye genelinde güçlü ticaret ağı"
                  },
                  {
                    icon: "🔒",
                    text: "Şeffaf, kayıtlı ve güvenli işlemler"
                  },
                  {
                    icon: "🛠️",
                    text: "Her sektöre uygun, kişiye özel çözümler"
                  },
                  {
                    icon: "🛡️",
                    text: "Krizlere karşı dayanıklı ticaret modeli"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl mr-3">{item.icon}</div>
                    <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Alt açıklama kutusu */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 md:flex md:items-center md:justify-between md:space-x-6">
                <div className="flex-1 space-y-4">
                  <p className="text-lg text-gray-800 font-semibold">
                    Ulusal Barter A.Ş. ile ticaretinizin geleceğini bugünden kurun.
                  </p>
                  <div className="bg-amber-50 border-l-4 border-amber-300 p-4 rounded">
                    <p className="text-gray-700 italic">
                      &quot;Nakitsiz ticaretin gücünü keşfedin, işletmenizin potansiyelini ortaya çıkarın.
                      ULUSAL BARTER A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli.&quot;
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:w-48 shrink-0">
                  <Link href="/iletisim" passHref>
                    <button className="w-full px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-amber-600 transition duration-300 shadow-md hover:shadow-lg">
                      Bize Hemen Ulaşın
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer
          ref={el => sectionRefs.current[3] = el}
          className="w-full py-12 relative overflow-hidden bg-yellow-600 text-white opacity-0 translate-y-10 transition-all duration-500"
        >
          {/* Arka Plan Efektleri */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/texture.png')] opacity-50 mix-blend-overlay"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-white">
                  Bizimle İletişime Geçin
                </span>
              </h2>
              <div className="mt-4 h-px w-24 bg-yellow-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 1. Kart - Logo ve Slogan */}
              <div className="bg-yellow-400/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <h2 className="text-2xl font-bold text-white">Ulusal Barter</h2>
                <Image src="/newbg02.png" alt="Ulusal Barter Yatırım Logo" width={130} height={150} className="mb-2" />
                <p className="text-yellow-200 text-sm">Barter Yatırımın Güvencesi: Ulusal Güç, Yerel Çözüm!</p>
              </div>

              {/* 2. Kart - Bağlantılar */}
              <div className="bg-yellow-400/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <h3 className="text-2xl font-semibold text-white">Bağlantılar</h3>
                <ul className="space-y-2">
                  <li><a href="/hakkinda" className="text-yellow-200 hover:text-white transition">Hakkımızda</a></li>
                  <li><a href="/barter" className="text-yellow-200 hover:text-white transition">Barter Sistemi</a></li>
                  <li><a href="/uyelik" className="text-yellow-200 hover:text-white transition">Üyelik</a></li>
                </ul>
              </div>

              {/* 3. Kart - İletişim */}
              <div className="bg-yellow-400/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <h3 className="text-2xl font-bold text-white mb-4">İletişim</h3>
                <div className="space-y-2 text-sm text-yellow-200 font-light">
                  <a href="tel:0232 600 25 25" className="block hover:text-white transition-colors">
                    0232 600 25 25
                  </a>
                  <a href="mailto:ulusalbarter@gmail.com" className="block hover:text-white transition-colors">
                    ulusalbarter@gmail.com
                  </a>
                </div>
              </div>

              {/* 4. Kart - Adres */}
              <div className="bg-yellow-400/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center text-yellow-200 text-sm leading-6 min-h-[300px]">
                <h2 className="text-2xl font-bold text-white mb-4">Adres</h2>
                <p>Mansuroğlu Mah. 283/1 Sk. No:2 GSK Plaza K:1 D:201 Bayraklı/İzmir</p>
              </div>
            </div>

            {/* Alt Kısım - Telif ve Politikalar */}
            <div className="mt-4 pt-4 border-t border-yellow-100/30 w-full text-center">
              <p className="text-yellow-100 text-sm">
                © {new Date().getFullYear()} Ulusal Barter A.Ş. Tüm hakları saklıdır.
              </p>
              <div className="mt-2 flex justify-center space-x-2">
                <a href="/privacy" className="text-yellow-100 hover:text-white text-xs transition-colors">Gizlilik Politikası</a>
                <a href="/cookies" className="text-yellow-100 hover:text-white text-xs transition-colors">Çerezler</a>
                <a href="/terms" className="text-yellow-100 hover:text-white text-xs transition-colors">Şartlar</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
