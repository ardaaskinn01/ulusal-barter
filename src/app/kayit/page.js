"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase"; // ← firebase yapılandırmanı buraya ekleyeceğiz
import { useLanguage } from '../LanguageContext.js';

export default function Kayit() {
    const { translate } = useLanguage();
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

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                ad,
                soyad,
                telefon,
                adres,
                email,
                role: "user",
                isAccept: false,
                createdAt: new Date(),
            });

            // Kullanıcı oluşturulduktan sonra onay kontrolü
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (!userData.isAccept) {
                    setError(translate("registerErrorApproval"));
                    await auth.signOut();
                    return;
                } else {
                    router.push("/dashboard");
                }
            }
        } catch (err) {
            setError(translate("registerErrorGeneral"));
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
                        {translate("registerTitle")}
                    </h1>

                    <div className="flex flex-col gap-4 mb-6">
                        <input
                            name="ad"
                            onChange={handleChange}
                            placeholder={translate("registerPlaceholderFirstName")}
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="soyad"
                            onChange={handleChange}
                            placeholder={translate("registerPlaceholderLastName")}
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="telefon"
                            onChange={handleChange}
                            placeholder={translate("registerPlaceholderPhone")}
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="adres"
                            onChange={handleChange}
                            placeholder={translate("registerPlaceholderAddress")}
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder={translate("registerPlaceholderEmail")}
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            placeholder={translate("registerPlaceholderPassword")}
                            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {error && (
                        <div className="bg-green-100 border border-red-400 text-gray-900 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">{translate("registerWarning")} </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Kayıt butonu */}
                    <button
                        onClick={handleRegister}
                        className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 hover:opacity-90 transition"
                    >
                        {translate("registerButton")}
                    </button>
                </div>
            </div>
        </div>
    );
}
