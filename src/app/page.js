"use client";
import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar";
import CountUp from 'react-countup';
import { useRouter } from 'next/router';
import Image from "next/image";
import { useRef } from 'react';
import { useState, useEffect } from 'react';


const useSectionAnimation = (setStartCountUp) => { // setStartCountUp parametre olarak eklendi
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');

          // Stats section için CountUp animasyonlarını tetikle
          if (entry.target.classList.contains('stats-section')) {
            setStartCountUp(true); // Artık burada erişilebilir
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
  }, [setStartCountUp]); // setStartCountUp dependency olarak eklendi

  return sectionRefs;
};

export default function Home() {
  const [startCountUp, setStartCountUp] = useState(false);
  const sectionRef = useRef(null);
  const sectionRefs = useSectionAnimation(setStartCountUp);
  const [currentBg, setCurrentBg] = useState(0);
  const [animatedText1, setAnimatedText1] = useState("");
  const [animatedText2, setAnimatedText2] = useState("");
  const backgrounds = [
    '/bg14.jpg',
    '/bg02.jpg',
    '/bg03.jpg'
  ];
  const containerRef = useRef(null);
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

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

  // Metin animasyonları için
  useEffect(() => {
    const text1 = "Barter Yatırımın Güvencesi:";
    const text2 = "Ulusal Güç, Yerel Çözüm!";

    // İlk metin animasyonu
    let i = 0;
    const typing1 = setInterval(() => {
      if (i < text1.length) {
        setAnimatedText1(text1.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing1);

        // İkinci metin animasyonu
        let j = 0;
        const typing2 = setInterval(() => {
          if (j < text2.length) {
            setAnimatedText2(text2.substring(0, j + 1));
            j++;
          } else {
            clearInterval(typing2);
          }
        }, 85); // İkinci metin yazma hızı (daha hızlı)
      }
    }, 75); // İlk metin yazma hızı (daha hızlı)

    // Arka plan slider animasyonu
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => {
      clearInterval(typing1);
      clearInterval(interval);
    };
  }, []);

  const scrollToSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handlePrevious = () => {
    setCurrentBg((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  const handleNext = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const diff = startX - currentX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrevious();
    isDragging = false;
  };

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX - currentX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrevious();
  };

  return (
    <>
      <Head>
        <title>Abdullah Şimşek</title>
        <meta name="description" content="Nurettin Tutak - Profesyonel Flutter Geliştirici" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen flex flex-col relative bg-gray-950">
        <Navbar />

        <section
          className="pt-32 md:pt-40 h-screen flex items-center justify-center text-center px-6 bg-cover bg-center relative overflow-hidden"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {backgrounds.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
              style={{
                backgroundImage: `url('${bg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
          ))}

          <div className="relative max-w-4xl mx-auto z-10">
            <h1 className="text-center mb-12 relative">
              <span className="block text-4xl md:text-6xl font-medium text-white leading-tight mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                  {animatedText1}
                  {animatedText1.length < "Barter Yatırımın Güvencesi:".length && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
              </span>
              <span className="block text-5xl md:text-7xl font-bold text-white leading-tight">
                {animatedText2}
                {animatedText1 === "Barter Yatırımın Güvencesi:" && animatedText2.length < "Ulusal Güç, Yerel Çözüm!".length && (
                  <span className="animate-pulse">|</span>
                )}
              </span>
              <div
                className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-1000 delay-1000 scale-x-0 origin-left"
                style={{
                  animation: animatedText2 === "Ulusal Güç, Yerel Çözüm!" ? 'scaleIn 1s forwards' : ''
                }}
              />
            </h1>
            <p
              className="text-white text-lg max-w-2xl mx-auto mb-10 font-light opacity-0"
              style={{
                animation: animatedText2 === "Ulusal Güç, Yerel Çözüm!" ? 'fadeIn 1s forwards 0.5s' : ''
              }}
            >
              ULUSAL BARTER YATIRIM
            </p>

            <div
              className="mt-16 cursor-pointer opacity-0"
              onClick={scrollToSection}
              style={{
                animation: animatedText2 === "Ulusal Güç, Yerel Çözüm!" ? 'fadeInUp 1s forwards 1s' : ''
              }}
            >
              <svg className="w-8 h-8 text-yellow-600 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Slider kontrolleri */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
            {backgrounds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBg(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentBg ? 'bg-white w-6' : 'bg-white/50'}`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section
          ref={el => sectionRefs.current[0] = el}
          className="w-full py-20 min-h-[400px] relative overflow-hidden bg-cover bg-center opacity-0 translate-y-10 transition-all duration-500"
          style={{ backgroundImage: "url('/bg08.jpg')" }}
        >
          {/* Siyah yarı saydam overlay */}
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-500 rounded-full filter blur-[60px]"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-indigo-900 rounded-full filter blur-[80px]"></div> {/* yellow → indigo */}
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            {/* Başlık ve içerik */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">Hoş Geldiniz!</h2>
              <h2 className="text-3xl md:text-3xl font-bold mb-6 text-yellow-600 drop-shadow-sm">
                Ulusal Barter Yatırım A.Ş.
              </h2>
              <div className="w-24 h-1 bg-yellow-600 mx-auto mb-6 rounded"></div> {/* yellow → indigo */}
              <p className="text-lg md:text-xl mb-4 text-white font-medium drop-shadow-sm">Nakitin Ötesinde Bir Ekonomi.</p> {/* yellow → indigo */}
            </div>

            <p className="text-base md:text-lg leading-relaxed text-gray-200 mb-4">
              Ulusal Barter Yatırım A.Ş., Türkiye çapında faaliyet gösteren yenilikçi barter Yatırım sistemiyle işletmelere nakitsiz ticaretin güçlü altyapısını sunar.
              İşletmelerin değer üreten yönlerini öne çıkararak, Yatırımal sıkışıklık yaşamadan büyümelerini sağlarız.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-gray-200">
              Biz, işletmelerin yalnızca bugününü değil, yarınını da planlayan güçlü bir barter Yatırım çözüm ortağıyız.
            </p>
          </div>
        </section>

        <section
          ref={el => sectionRefs.current[1] = el}
          className="w-full py-20 min-h-[400px] relative overflow-hidden bg-cover bg-center opacity-0 translate-y-10 transition-all duration-500"
          style={{ backgroundImage: "url('/bg07.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-900 rounded-full filter blur-[60px]"></div>
            <div className="absolute top-10 left-1/4 w-60 h-60 bg-indigo-900 rounded-full filter blur-[80px]"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold italic mb-4
      bg-gradient-to-r from-gray-300 to-gray-100
      text-transparent bg-clip-text
      drop-shadow-[0_4px_8px_rgba(0,255,255,0.4)] 
      transition-all duration-300 
      hover:scale-105"
              >
                Neden Ulusal Barter Yatırım?
              </h2>
              <div className="w-24 h-1 bg-indigo-700 mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  "Nakit harcamadan büyüme fırsatı",
                  "Stokları değere dönüştüren sistem",
                  "Türkiye genelinde güçlü ticaret ağı",
                  "Şeffaf, kayıtlı ve güvenli işlemler",
                  "Her sektöre uygun, kişiye özel çözümler",
                  "Krizlere karşı dayanıklı ticaret modeli"
                ].map((text, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-400 p-6 rounded-lg shadow-lg border border-indigo-900 flex items-start"
                  >
                    <svg
                      className="h-6 w-6 text-white mt-1 mr-3 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white font-medium">{text}</span>
                  </div>
                ))}
              </div>


              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 p-6 md:p-6 rounded-lg shadow-xl border border-yellow-200 w-full md:max-w-sm mx-auto self-start">
                <div className="flex flex-col justify-between space-y-6">
                  <p className="text-lg text-gray-100 font-semibold">
                    Ulusal Barter Yatırım A.Ş. ile ticaretinizin geleceğini bugünden kurun.
                  </p>

                  <div className="bg-white bg-opacity-80 border-l-4 border-indigo-900 p-4 rounded shadow-sm">
                    <p className="text-gray-700 italic">
                      &quot;Nakitsiz ticaretin gücünü keşfedin, işletmenizin potansiyelini ortaya çıkarın.<br />
                      Barter Yatırım A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli.&quot;
                    </p>
                  </div>

                  <Link href="/iletisim" passHref>
                    <button className="w-full px-6 py-3 bg-indigo-900 text-white font-medium rounded-lg hover:bg-yellow-800 transition duration-300 shadow-md hover:shadow-lg">
                      Bize Hemen Ulaşın
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        <footer
          ref={el => sectionRefs.current[2] = el}
          className="w-full py-20 relative overflow-hidden bg-gradient-to-br from-yellow-800 via-yellow-700 to-yellow-500 text-white opacity-0 translate-y-10 transition-all duration-500"
        >
          {/* Arka Plan Efektleri */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/texture.png')] opacity-10 mix-blend-overlay"></div>
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white">
                  Bizimle İletişime Geçin
                </span>
              </h2>
              <div className="mt-4 h-px w-24 bg-gradient-to-r from-yellow-200 to-white mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* 1. Kart - Logo ve Slogan */}
              <div className="bg-yellow-800/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <h2 className="text-2xl font-bold text-white">Ulusal Barter Yatırım</h2>
                <Image src="/yenilogo5.png" alt="Ulusal Barter Yatırım Logo" width={150} height={180} className="mb-2" />
                <p className="text-yellow-100 text-sm">Barter Yatırımın Güvencesi: Ulusal Güç, Yerel Çözüm!</p>
              </div>

              {/* 2. Kart - Bağlantılar */}
              <div className="bg-yellow-800/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <h3 className="text-lg font-semibold text-white">Bağlantılar</h3>
                <ul className="space-y-2">
                  <li><a href="/hakkinda" className="text-yellow-200 hover:text-white transition">Hakkımızda</a></li>
                  <li><a href="/barter" className="text-yellow-200 hover:text-white transition">Barter Sistemi</a></li>
                  <li><a href="/uyelik" className="text-yellow-200 hover:text-white transition">Üyelik</a></li>
                </ul>
              </div>

              {/* 3. Kart - Telefon */}
              <div className="bg-yellow-800/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-yellow-200/10 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">Telefon</h3>
                <a href="tel:+905321655220" className="text-yellow-200 hover:text-white transition-colors text-sm font-light">
                  +90 (532) 165 52 20
                </a>
              </div>

              {/* 4. Kart - Adres */}
              <div className="bg-yellow-800/40 p-6 rounded-xl border border-yellow-400/20 hover:border-white/50 transition-all duration-300 backdrop-blur-sm flex flex-col items-center justify-center text-center text-yellow-100 text-sm leading-6 min-h-[300px]">
                <h2 className="text-2xl font-bold text-white mb-4">Adres</h2>
                <p>Mansuroğlu mah. 283/1 Sk. No:2 GSK Plaza K:1 D:201 Bayraklı/İzmir</p>
              </div>
            </div>

            {/* Alt Kısım - Telif ve Politikalar */}
            <div className="mt-16 pt-8 border-t border-yellow-100/30 w-full text-center">
              <p className="text-yellow-200 text-sm">
                © {new Date().getFullYear()} Ulusal Barter Yatırım. Tüm hakları saklıdır.
              </p>
              <div className="mt-2 flex justify-center space-x-4">
                <a href="#" className="text-yellow-300 hover:text-white text-xs transition-colors">Gizlilik Politikası</a>
                <a href="#" className="text-yellow-300 hover:text-white text-xs transition-colors">Çerezler</a>
                <a href="#" className="text-yellow-300 hover:text-white text-xs transition-colors">Şartlar</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
