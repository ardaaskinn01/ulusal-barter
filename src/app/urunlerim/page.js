"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";

export default function UrunlerimPage() {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/uyelik");
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const filtered = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userId === user.uid) {
            filtered.push({ id: doc.id, ...data });
          }
        });

        setMyProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Veri alınamadı:", error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-400 text-white">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-yellow-400 text-gray-800 p-6">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mb-8">Ürünlerim</h1>

      {myProducts.length === 0 ? (
        <p className="text-center text-lg bg-white/80 px-6 py-4 rounded-xl shadow-md">
          Henüz eklediğiniz bir ürün yok.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/urun/${encodeURIComponent(product.id)}`)}
              className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4"
            >
              <img
                src={product.anaGorselUrl}
                alt={product.isim}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-center">{product.isim}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
