"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Barter() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: false,
        mode: "snap",
        slides: {
            perView: 1,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
    });

    const slides = [
        "/1.svg", "/2.svg", "/3.svg", "/4.svg", "/5.svg", "/6.svg",
        "/7.svg", "/8.svg", "/9.svg", "/10.svg", "/11.svg", "/12.svg",
    ];

    const nextSlide = () => instanceRef.current?.next();
    const prevSlide = () => instanceRef.current?.prev();

    return (
        <>
            <Head>
                <title>Barter Sistemi | ULUSAL BARTER A.Ş.</title>
                <meta name="description" content="Ulusal Barter Finans A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli." />
                <meta property="og:title" content="Barter Sistemi | ULUSAL BARTER A.Ş." />
                <meta property="og:description" content="Ürün ve hizmetlerinizi takas yöntemiyle değerlendirin" />
            </Head>

            <div className="min-h-screen relative text-white">
                {/* Arka plan resmi */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/bg32.jpg"
                        alt="background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Siyah karartma overlay */}
                    <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
                </div>

                <Navbar />

                {/* Slayt Alanı */}
                <div className="relative z-10 mt-24 px-4 sm:px-16">
                    <div className="keen-slider h-[80vh] rounded-xl overflow-hidden" ref={sliderRef}>
                        {slides.map((src, index) => (
                            <div
                                className="keen-slider__slide flex justify-center items-center"
                                key={index}
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

                    {/* Ok Tuşları */}
                    <div className="flex justify-between items-center mt-4 max-w-5xl mx-auto px-4">
                        <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded disabled:opacity-50"
                        >
                            <ArrowLeft className="inline mr-1" /> Geri
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded disabled:opacity-50"
                        >
                            İleri <ArrowRight className="inline ml-1" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}