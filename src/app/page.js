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
    '/bg01.jpg',
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
    const text1 = "Barter Finansın Güvencesi:";
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
        }, 100); // İkinci metin yazma hızı
      }
    }, 150); // İlk metin yazma hızı

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
                  {animatedText1.length < "Barter Finansın Güvencesi:".length && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
              </span>
              <span className="block text-5xl md:text-7xl font-bold text-white leading-tight">
                {animatedText2}
                {animatedText1 === "Barter Finansın Güvencesi:" && animatedText2.length < "Ulusal Güç, Yerel Çözüm!".length && (
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
              className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 font-light opacity-0"
              style={{
                animation: animatedText2 === "Ulusal Güç, Yerel Çözüm!" ? 'fadeIn 1s forwards 0.5s' : ''
              }}
            >
              ULUSAL BARTER FİNANS
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
          <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-500 rounded-full filter blur-[60px]"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-yellow-500 rounded-full filter blur-[80px]"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            {/* Başlık ve içerik */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Hoş Geldiniz</h2>
              <h2 className="text-3xl md:text-3xl font-bold mb-6 text-yellow-600">Ulusal Barter Finans A.Ş.</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
              <p className="text-lg md:text-xl mb-4 text-yellow-500 font-medium">Nakitin Ötesinde Bir Ekonomi.</p>
            </div>

            <div className="bg-white p-10 rounded-lg shadow-xl border border-gray-100">
              <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4">
                Ulusal Barter Finans A.Ş., Türkiye çapında faaliyet gösteren yenilikçi barter finans sistemiyle işletmelere nakitsiz ticaretin güçlü altyapısını sunar.
                İşletmelerin değer üreten yönlerini öne çıkararak, finansal sıkışıklık yaşamadan büyümelerini sağlarız.
              </p>
              <p className="text-base md:text-lg leading-relaxed text-gray-700">
                Biz, işletmelerin yalnızca bugününü değil, yarınını da planlayan güçlü bir barter finans çözüm ortağıyız.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={el => sectionRefs.current[1] = el}
          className="w-full py-20 min-h-[400px] relative overflow-hidden bg-cover bg-center opacity-0 translate-y-10 transition-all duration-500"
          style={{ backgroundImage: "url('/bg07.jpg')" }}
        >
          {/* Dekoratif arkaplan elementleri */}
          <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500 rounded-full filter blur-[60px]"></div>
            <div className="absolute top-10 left-1/4 w-60 h-60 bg-yellow-500 rounded-full filter blur-[80px]"></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-600">Neden Ulusal Barter Finans?</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Avantajlar Listesi */}
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Nakit harcamadan büyüme fırsatı</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Stokları değere dönüştüren sistem</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Türkiye genelinde güçlü ticaret ağı</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Şeffaf, kayıtlı ve güvenli işlemler</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Her sektöre uygun, kişiye özel çözümler</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-yellow-500 mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Krizlere karşı dayanıklı ticaret modeli</span>
                  </li>
                </ul>
              </div>

              {/* Açıklama ve CTA */}
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col">
                <div className="flex-grow">
                  <p className="text-lg text-gray-700 mb-6">
                    Ulusal Barter Finans A.Ş. ile ticaretinizin geleceğini bugünden kurun.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <p className="text-gray-700 italic">
                      Nakitsiz ticaretin gücünü keşfedin, işletmenizin potansiyelini ortaya çıkarın.
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/iletisim" passHref>
                    <button className="w-full px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition duration-300 shadow-md hover:shadow-lg">
                      Bize Hemen Ulaşın
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer
          ref={el => sectionRefs.current[2] = el}
          className="w-full py-12 bg-gradient-to-r from-yellow-600 to-yellow-400 text-white relative overflow-hidden opacity-0 translate-y-10 transition-all duration-500"
        >
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Sol Bölüm - Logo ve Slogan */}
              <div>
                <h2 className="text-2xl font-bold mb-0">Ulusal Barter Finans</h2>
                <Image src="/logo2.png" alt="Ulusal Barter Finans Logo" width={150} height={180} className="mb-2" />
                <p className="text-gray-300">Barter Finansın Güvencesi: Ulusal Güç, Yerel Çözüm!</p>
              </div>

              {/* Orta Bölüm - Bağlantılar */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Bağlantılar</h3>
                <ul className="space-y-2">
                  <li><a href="/hakkinda" className="text-gray-200 hover:text-white transition">Hakkımızda</a></li>
                  <li><a href="/barter" className="text-gray-200 hover:text-white transition">Barter Sistemi</a></li>
                  <li><a href="/uyelik" className="text-gray-200 hover:text-white transition">Üyelik</a></li>
                </ul>
              </div>

              {/* Sağ Bölüm - İletişim */}
              <div>
                <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
                <address className="text-gray-200 not-italic">
                  <p>Mansuroğlu mah. 283/1 Sk. No:2 GSK Plaza K:1 D:201 Bayraklı/İzmir</p>
                  <p className="mt-2">+90 (532) 165 52 20</p>
                  <p>Abdullah Şimşek</p>
                </address>
              </div>

              {/* Copyright */}
              <div className="mt-16 pt-8 border-t border-gray-800/50 w-full text-center">
                <p className="text-gray-500 text-sm">
                  © {new Date().getFullYear()} Ulusal Finans Barter. Tüm hakları saklıdır.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
