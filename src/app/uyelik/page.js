"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Uyelik() {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Navbar />

      {/* Arka plan görseli */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg09.jpg"
          alt="background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* İçerik */}
      <div className="flex-grow flex items-center justify-center relative z-10 px-4">
        <div className="text-center bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            Mobil uygulamamız çok yakında sizleri bekliyor...
          </h1>
        </div>
      </div>
    </div>
  );
}
