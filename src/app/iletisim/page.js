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

        <div className="flex-grow py-40 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 mt-8">
              <h1 className="text-5xl font-bold text-yellow-600 mb-4">İLETİŞİM</h1>
              <p className="text-lg text-gray-500">Bizimle iletişime geçmekten çekinmeyin.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* İletişim Bilgileri - Minimal Versiyon */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">İletişim Bilgileri</h3>
                <ul className="space-y-5">
                  <li className="flex gap-3 items-start">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">E-Posta</p>
                      <a href="mailto:ulusalbarter@gmail.com" className="text-gray-700 hover:text-amber-600 transition">
                        ulusalbarter@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <a href="tel:02326002525" className="text-gray-700 hover:text-amber-600 transition">
                        0232 600 25 25
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Adres</p>
                      <p className="text-gray-700">
                        Mansuroğlu Mah. 283/1 Sk. No:2 GSK Plaza K:1 D:201 Bayraklı/İzmir
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    title="Ofis Lokasyonu"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.568299509286!2d27.185589076705973!3d38.45143937182271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b963ad9314ab8d%3A0x721a011af52f9fff!2sGsk%20plaza!5e0!3m2!1str!2str!4v1747950835918!5m2!1str!2str"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* İletişim Formu - Minimal Versiyon */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-600 mb-1">E-posta</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-600 mb-1">Mesajınız</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-amber-700 text-white font-medium py-2.5 rounded-md transition mt-2"
                  >
                    Mesaj Gönder
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
