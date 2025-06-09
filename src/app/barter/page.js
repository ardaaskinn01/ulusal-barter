"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";

export default function Barter() {
  const containerRef = useRef(null);

  const slides = [
    "/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png",
    "/7.png", "/8.png", "/9.png", "/10.png", "/11.png", "/12.png",
  ];

  const scrollTo = (direction) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollAmount = container.clientWidth;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current;

        const isAtEnd =
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;

        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({
            left: container.clientWidth,
            behavior: "smooth",
          });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Barter Sistemi | ULUSAL BARTER A.Ş.</title>
        <meta name="description" content="Ulusal Barter Finans A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli." />
        <meta property="og:title" content="Barter Sistemi | ULUSAL BARTER A.Ş." />
        <meta property="og:description" content="Ürün ve hizmetlerinizi takas yöntemiyle değerlendirin" />
      </Head>

      <div className="min-h-screen relative text-white">
        {/* Arka Plan */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg35.jpg"
            alt="background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
        </div>

        <Navbar />

        {/* Ana İçerik */}
        <div className="relative z-10 mt-48 px-4 sm:px-16 flex justify-center">
          {/* Slaytlar */}
          <div className="relative w-full max-w-6xl">
            <div
              ref={containerRef}
              className="w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory flex no-scrollbar"
            >
              {slides.map((src, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-center flex justify-center items-center transition-transform duration-500"
                >
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={976}
                    height={540}
                    className="rounded-xl shadow-xl"
                  />
                </div>
              ))}
            </div>

            {/* Ok Butonları */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 sm:px-8">
              <button
                onClick={() => scrollTo("left")}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={() => scrollTo("right")}
                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}