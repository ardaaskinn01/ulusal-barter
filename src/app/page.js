"use client";
import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { useRef } from 'react';

import { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import { DollarSign, Box, Lock, Settings, Shield, Handshake, ShieldCheck, TrendingUp, Package, Globe, CreditCard } from 'lucide-react';
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

      <div className="min-h-screen flex flex-col relative bg-gray-950">
        {/* Navbar import'unu eklemeyi unutmayın */}
        <Navbar />

        <section
          className="py-12 mt-24 sm:py-20 md:py-24 flex items-center justify-center text-center px-6 bg-gray-100 relative overflow-hidden"
        >
          {/* Video Oynatıcı Alanı */}
          <div className="relative w-full max-w-5xl h-[220px] sm:h-[550px] mx-auto rounded-xl overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              Tarayıcınız video etiketini desteklamiyor.
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
        </section>

        {/* İkinci section aynı kalabilir veya kendi ihtiyaçlarınıza göre ayarlayabilirsiniz */}
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
                <div className="mt-8">
                  <a href="/uyelik" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
                    Barter Sistemini Keşfedin
                  </a>
                </div>
              </div>

              {/* Sağ taraf - Açıklama metni */}
              <div className="lg:w-1/2 lg:pl-8 lg:border-l lg:border-gray-700">
                <div className="space-y-6">
                  <p className="text-base md:text-lg leading-relaxed text-gray-600 text-justify">
                    Türkiye&apos;nin önde gelen barter platformu olarak, işletmelerin değer üreten yönlerini öne çıkarıyor ve nakit sıkışıklığı yaşamadan büyümelerini sağlıyoruz. Ulusal Barter A.Ş. olarak, geleneksel finans sistemlerinin ötesinde çözümler sunuyoruz.
                  </p>
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
          ref={el => sectionRefs.current[1] = el}
          className="w-full py-16 sm:py-20 md:py-24 bg-gray-100 text-gray-800 relative overflow-hidden opacity-0 translate-y-10 transition-all duration-500"
        >
          {/* Arka Plan Efektleri - Daha Hafif */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/10 to-transparent opacity-20"></div>
            <div className="absolute bottom-0 left-1/4 -translate-x-1/2 w-48 h-48 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
            <div className="absolute top-1/4 right-1/4 translate-x-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-5"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-yellow-600 leading-tight">
                Barter ile Elde Edeceğiniz Avantajlar
              </h2>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Nakitsiz ticaretin sunduğu fırsatları keşfedin.
              </p>
              <div className="w-16 h-0.5 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Avantaj Kart 1 - Daha Minimal */}
              <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-yellow-500 mb-3">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Nakit Akışı</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Nakit çıkışını azaltın, likiditenizi koruyun.
                </p>
              </div>

              {/* Avantaj Kart 2 - Daha Minimal */}
              <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-yellow-500 mb-3">
                  <Package className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Stok Yönetimi</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Stoklarınızı değer karşılığında kullanın.
                </p>
              </div>

              {/* Avantaj Kart 3 - Daha Minimal */}
              <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-yellow-500 mb-3">
                  <Globe className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Pazar Erişimi</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Yeni iş bağlantıları ve müşteriler edinin.
                </p>
              </div>

              {/* Avantaj Kart 4 - Daha Minimal */}
              <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-yellow-500 mb-3">
                  <Handshake className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Güvenilir Ticaret</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Şeffaf ve güvenli barter işlemleri.
                </p>
              </div>

              {/* Avantaj Kart 5 - Daha Minimal */}
              <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-yellow-500 mb-3">
                  <CreditCard className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Esnek Çözümler</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Çeşitli ödeme ve takas imkanları.
                </p>
              </div>

              {/* Avantaj Kart 6 - Daha Minimal */}
              <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center text-center border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-yellow-500 mb-3">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Ekonomik Güç</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Dalgalanmalara karşı dirençli ticaret.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a
                href="/barter"
                className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105"
              >
                Daha Fazlasını Öğrenin
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </a>
            </div>
          </div>
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
          className="w-full py-16 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4">
            {/* Başlık */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                Neden Bizi Seçmelisiniz?
              </h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
            </div>

            {/* Grid kart listesi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: "Nakit harcamadan büyüme fırsatı"
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  ),
                  text: "Stokları değere dönüştüren sistem"
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  text: "Türkiye genelinde güçlü ticaret ağı"
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  text: "Şeffaf, kayıtlı ve güvenli işlemler"
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  text: "Her sektöre uygun, kişiye özel çözümler"
                },
                {
                  icon: (
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  text: "Krizlere karşı dayanıklı ticaret modeli"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-5 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors"
                >
                  <div className="bg-amber-50 p-2 rounded-full mr-4">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Alt açıklama kutusu */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="md:flex md:items-center md:justify-between md:space-x-8">
                <div className="flex-1 space-y-4">
                  <p className="text-lg text-gray-800 font-semibold">
                    Ulusal Barter A.Ş. ile ticaretinizin geleceğini bugünden kurun.
                  </p>
                  <div className="border-l-4 border-amber-400 pl-4">
                    <p className="text-gray-600 italic">
                      "Nakitsiz ticaretin gücünü keşfedin, işletmenizin potansiyelini ortaya çıkarın.
                      ULUSAL BARTER A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli."
                    </p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:w-48 shrink-0">
                  <Link href="/iletisim" passHref>
                    <button className="w-full px-4 py-2.5 bg-yellow-500 hover:bg-amber-700 text-white font-medium rounded-md transition">
                      Bize Ulaşın
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
