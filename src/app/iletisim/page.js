"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mesajınız başarıyla gönderildi!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorMessage = await response.text();
        alert(`Hata: ${errorMessage}`);
      }
    } catch (error) {
      console.error("İstek gönderme hatası:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <Head>
        <title>İletişim | ULUSAL BARTER A.Ş. - Bize Ulaşın</title>
        <meta name="description" content="Ulusal Barter A.Ş. ile iletişime geçin. Uzman barter danışmanlarımız size en kısa sürede dönüş yapacaktır. Ofis adresimiz, telefon ve e-posta bilgilerimiz." />
        <meta property="og:title" content="İletişim | ULUSAL BARTER A.Ş." />
        <meta property="og:description" content="Uzman barter danışmanlarımızla iletişime geçin" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ulusalbarter.com/iletisim" />
      </Head>
      <div className="min-h-screen bg-yellow text-gray-800 flex flex-col relative">
        <Navbar />

        <div className="absolute inset-0 z-0">
          <Image
            src="/bg23.jpg"
            alt="background"
            fill
            className="object-cover blur-[4px]"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-65"></div>
        </div>

        <div className="flex-grow py-24 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 mt-8">
              <h1 className="text-5xl font-bold text-yellow-600 mb-4">İLETİŞİM</h1>
              <p className="text-lg text-gray-500">Bizimle iletişime geçmekten çekinmeyin.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* İletişim Bilgileri */}
              <div className="bg-white/70 p-8 rounded-2xl border-4 border-yellow-600 shadow-2xl backdrop-blur-md transition-transform hover:scale-[1.02]">
                <h3 className="text-3xl font-bold text-yellow-600 mb-8 border-b border-yellow-600 pb-2">İletişim Bilgileri</h3>
                <ul className="space-y-8">
                  <li className="flex gap-4 items-start">
                    <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">E-Mail</p>
                      <a href="mailto:nurettintutak@hotmail.com" className="text-lg font-medium text-gray-900 hover:text-yellow-600 transition">
                        ulusalbarter@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4 items-start">
                    <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Telefon</p>
                      <a href="tel:+905467689992" className="text-lg font-medium text-gray-900 hover:text-yellow-600 transition">
                        0232 600 25 25
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4 items-start">
                    <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 11c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 22s8-6.5 8-13a8 8 0 10-16 0c0 6.5 8 13 8 13z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Adres</p>
                      <p className="text-lg font-medium text-gray-900">
                        Mansuroğlu Mah. 283/1 Sk. No:2 GSK Plaza K:1 D:201 Bayraklı/İzmir
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-16 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-600">
                  <iframe
                    title="Ofis Lokasyonu"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.568299509286!2d27.185589076705973!3d38.45143937182271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b963ad9314ab8d%3A0x721a011af52f9fff!2sGsk%20plaza!5e0!3m2!1str!2str!4v1747950835918!5m2!1str!2str"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* İletişim Formu */}
              <div className="bg-white/70 p-8 rounded-2xl border-4 border-yellow-600 shadow-2xl backdrop-blur-md transition-transform hover:scale-[1.02]">
                <h3 className="text-3xl font-bold text-yellow-600 mb-8 border-b border-yellow-600 pb-2">Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Ad Soyad</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">E-posta</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Mesajınız</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold py-3 rounded-lg shadow-lg transition"
                  >
                    GÖNDER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
