"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase"; // ← firebase yapılandırmanı buraya ekleyeceğiz

export default function Kayit() {
    const router = useRouter();
    const [form, setForm] = useState({
        ad: "",
        soyad: "",
        telefon: "",
        adres: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const { email, password, ad, soyad, telefon, adres } = form;

            // Kullanıcıyı oluştur
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Firestore'a kullanıcı bilgilerini kaydet, varsayılan rol: user
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                ad,
                soyad,
                telefon,
                adres,
                email,
                role: "user", // ← Otomatik olarak "user" rolü atanır
                createdAt: new Date(),
            });

            // Oto giriş sonrası yönlendir
            router.push("/dashboard");
        } catch (err) {
            setError("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-black relative">
            <Navbar />

            {/* Arka plan */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg22.jpg"
                    alt="background"
                    fill
                    className="object-cover blur-[8px]"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-65"></div>
            </div>

            {/* İçerik */}
            <div className="flex-grow flex items-start justify-center relative z-10 px-4 pt-24">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-xl w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                        Kayıt Ol
                    </h1>

                    <div className="flex flex-col gap-4 mb-6">
                        <input
                            name="ad"
                            onChange={handleChange}
                            placeholder="Ad"
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="soyad"
                            onChange={handleChange}
                            placeholder="Soyad"
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="telefon"
                            onChange={handleChange}
                            placeholder="Telefon"
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="adres"
                            onChange={handleChange}
                            placeholder="Adres"
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="E-Posta"
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="Şifre"
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    {/* Kayıt butonu */}
                    <button
                        onClick={handleRegister}
                        className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 hover:opacity-90 transition"
                    >
                        Kayıt Ol ve Giriş Yap
                    </button>
                </div>
            </div>
        </div>
    );
}
