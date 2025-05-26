"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase";
import Navbar from "../components/Navbar";
export const dynamic = "force-dynamic";

export default function Dashboard() {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            } else {
                router.push("/kayit"); // Giriş yapılmadıysa yönlendir
            }
        });

        return () => unsubscribe();
    }, []);

    return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-yellow-400 text-gray-800 relative">
        <Navbar />

        {/* Çıkış Yap Butonu Sağ Üstte */}
        <div className="absolute top-24 right-4">
            <button
                onClick={() => {
                    signOut(auth).then(() => {
                        router.push("/uyelik");
                    });
                }}
                className="px-4 py-2 bg-red-900 text-yellow-200 font-semibold rounded-lg shadow hover:bg-white"
            >
                Çıkış Yap
            </button>
        </div>

        <div className="flex flex-col items-center justify-center pt-24 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Hoşgeldiniz {userData ? `${userData.ad} ${userData.soyad}` : "..."}
            </h1>

            <p className="text-lg sm:text-xl bg-white/80 px-6 py-4 rounded-xl shadow-md">
                Henüz ürün veya hizmet bulunamadı.
            </p>
        </div>
    </div>
);
}