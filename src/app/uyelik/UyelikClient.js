"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useLanguage } from '../LanguageContext';

export default function UyelikClient() {
    const { translate } = useLanguage();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const tokenResult = await user.getIdTokenResult();
                const expirationTime = new Date(tokenResult.expirationTime);
                const now = new Date();

                if (expirationTime > now) {
                    router.push("/dashboard");
                } else {
                    auth.signOut();
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();

                if (userData.isAccept === false) {
                    setError("loginErrorApprove");
                    auth.signOut();
                } else {
                    router.push("/dashboard");
                }
            } else {
                setError("loginErrorNotFound");
                auth.signOut();
            }
        } catch (err) {
            setError("loginErrorFailed");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white relative">
                <Navbar />
                <div className="absolute inset-0 z-0">
                    <Image src="/bg22.jpg" alt="background" fill className="object-cover blur-[2px]" priority />
                    <div className="absolute inset-0 bg-black opacity-55"></div>
                </div>
                <div className="relative z-10 text-white text-xl font-semibold">{translate("loginLoading")}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white relative">
            <Navbar />
            <div className="absolute inset-0 z-0">
                <Image src="/bg22.jpg" alt="background" fill className="object-cover blur-[2px]" priority />
                <div className="absolute inset-0 bg-black opacity-55"></div>
            </div>

            <div className="flex-grow flex items-center justify-center relative z-10 px-4">
                <div className="text-center bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">{translate("loginTitle")}</h1>
                    <input
                        type="email"
                        placeholder={translate("loginEmail")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                    />
                    <input
                        type="password"
                        placeholder={translate("loginPassword")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
                    />
                    {error && <p className="text-red-600 mb-4">{translate(error)}</p>}
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 hover:opacity-90 mb-4 transition"
                    >
                        {translate("loginButton")}
                    </button>
                    <div className="flex justify-between text-sm text-yellow-700 font-medium">
                        <button onClick={() => router.push("/kayit")}>{translate("loginRegister")}</button>
                        <button onClick={() => router.push("/sifremi-unuttum")}>{translate("loginForgotPassword")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}