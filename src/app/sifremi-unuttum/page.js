"use client";

import { useState } from "react";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import Navbar from "../components/Navbar";
import { useLanguage } from '../LanguageContext';

export default function SifremiUnuttum() {
  const { translate } = useLanguage();
  const [email, setEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    setInfoMessage("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMessage(
        "Şifre sıfırlama bağlantısı mail adresinize gönderildi. Lütfen mailinizi kontrol edin."
      );
    } catch (err) {
      setError("Bir hata oluştu. Lütfen mail adresinizi kontrol edin.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Navbar />

      {/* Arka plan */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg22.jpg"
          alt="background"
          fill
          className="object-cover blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-55"></div>
      </div>

      {/* İçerik */}
      <div className="flex-grow flex items-center justify-center relative z-10 px-4">
        <div className="text-center bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
  {translate("forgotTitle")}
</h1>

          <input
            type="email"
            placeholder={translate("forgotPlaceholderEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            disabled={loading}
          />

          {error && <p className="text-red-600 mb-4">{translate("forgotError")}</p>}
{infoMessage && <p className="text-green-600 mb-4">{translate("forgotSuccess")}</p>}

          <button
            onClick={handleReset}
            disabled={!email || loading}
            className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 hover:opacity-90 mb-4 transition disabled:opacity-50"
          >
            {loading ? translate("forgotSending") : translate("forgotButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
