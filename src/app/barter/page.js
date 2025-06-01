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
            const scrollAmount = 612; // her resmin yüksekliği + boşluk
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
                        src="/bg32.jpg"
                        alt="background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
                </div>

                <Navbar />

                {/* Ana İçerik */}
                <div className="relative z-10 mt-24 px-4 sm:px-16 flex">
                    {/* Slaytlar */}
                    <div
                        ref={containerRef}
                        className="h-[90vh] flex-1 overflow-y-scroll scroll-smooth space-y-12 pr-4"
                    >
                        {slides.map((src, index) => (
                            <div
                                key={index}
                                className="flex justify-center items-center snap-center transition-transform duration-500"
                            >
                                <Image
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    width={1000}
                                    height={564}
                                    className="rounded-xl shadow-xl"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Ok Butonları */}
                    <div className="flex flex-col justify-center items-center gap-4 pl-4">
                        <button
                            onClick={() => scrollTo("up")}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold p-3 rounded-full shadow"
                        >
                            <ArrowUp />
                        </button>
                        <button
                            onClick={() => scrollTo("down")}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold p-3 rounded-full shadow"
                        >
                            <ArrowDown />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
