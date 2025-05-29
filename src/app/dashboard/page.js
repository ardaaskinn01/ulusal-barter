"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, query, orderBy, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";

import Navbar from "../components/Navbar";
export const dynamic = "force-dynamic";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Kullanıcı verisini al
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        router.push("/uyelik");
      }
    });

    return () => unsubscribe();
  }, []);

  // Ürünleri al
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error("Ürünler alınırken hata oluştu:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Scroll pozisyonunu yükle (loading false olduğunda)
  useEffect(() => {
    if (!loading) {
      const savedPosition = sessionStorage.getItem('scrollPos');
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPos');
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-400 text-white">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-yellow-400 text-gray-800 relative">
      <Navbar />

      <div className="absolute top-24 right-4 flex gap-2">
        {userData?.role === "admin" && (
          <button
            onClick={() => router.push("/urun-ekle")}
            className="px-4 py-2 bg-red-900 text-white rounded-lg shadow hover:bg-red-200"
          >
            Ürün Ekle
          </button>
        )}

        <button
          onClick={() => {
            signOut(auth).then(() => {
              router.push("/uyelik");
            });
          }}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-200"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="pt-36 px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Hoşgeldiniz {userData ? `${userData.ad} ${userData.soyad}` : "..."}
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-lg bg-white/80 px-6 py-4 rounded-xl shadow-md">
            Henüz ürün veya hizmet bulunamadı.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("scrollPos", window.scrollY.toString());
                  }
                  router.push(`/urun/${encodeURIComponent(product.id)}`);
                }}
                className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4"
              >
                <img
                  src={product.anaGorselUrl}
                  alt={product.isim}
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{product.isim}</h2>
                  <p className="text-3xl font-bold text-red-600 mt-1">
                    {
                      /\d\s*(₺|\$|€)$/.test(product.fiyat.trim())
                        ? product.fiyat
                        : `${product.fiyat} ₺`
                    }
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
