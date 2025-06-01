"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useRef } from "react";

export default function Barter() {
    const containerRef = useRef(null);

    const slides = [
        "/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png",
        "/7.png", "/8.png", "/9.png", "/10.png", "/11.png", "/12.png",
    ];

    const scrollTo = (direction) => {
        if (containerRef.current) {
            const scrollAmount = window.innerWidth < 640 ? 320 : 540; // mobilde 320, büyük ekranda 612
            containerRef.current.scrollBy({
                top: direction === "up" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

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
                <div className="relative z-10 mt-24 px-4 sm:px-16 flex justify-center">
                    {/* Slaytlar */}
                    <div className="relative w-full max-w-4xl">
                        <div
                            ref={containerRef}
                            className="h-[90vh] overflow-y-scroll scroll-smooth space-y-12 pr-2"
                        >
                            {slides.map((src, index) => (
                                <div
                                    key={index}
                                    className="flex justify-center items-center snap-center transition-transform duration-500"
                                >
                                    <Image
                                        src={src}
                                        alt={`Slide ${index + 1}`}
                                        width={1200}
                                        height={700}
                                        className="rounded-xl shadow-xl"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Şeffaf Oklar */}
                        <div className="absolute top-4 right-4 flex flex-col items-center gap-4 sm:right-[-60px]">
                            <button
                                onClick={() => scrollTo("up")}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition"
                            >
                                <ArrowUp />
                            </button>
                            <button
                                onClick={() => scrollTo("down")}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md transition"
                            >
                                <ArrowDown />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
