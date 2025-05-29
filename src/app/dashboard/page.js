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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-500">
      <Navbar />

      {/* Header Section */}
      <header className="bg-yellow-300 shadow-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Hoşgeldiniz, {userData ? `${userData.ad} ${userData.soyad}` : "..."}</h1>
            <p className="text-gray-500 mt-1">{products.length} ürün listeleniyor</p>
          </div>

          <div className="flex space-x-3">
            {userData?.role === "admin" && (
              <button
                onClick={() => router.push("/urun-ekle")}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
              className="px-4 py-2 bg-white border border-red-300 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Ürün bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">Henüz hiç ürün eklenmemiş.</p>
            {userData?.role === "admin" && (
              <div className="mt-6">
                <button
                  onClick={() => router.push("/urun-ekle")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Yeni Ürün Ekle
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => router.push(`/urun/${encodeURIComponent(product.id)}`)}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-150 ease-in-out cursor-pointer"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-50 relative">
                  <img
                    src={product.anaGorselUrl}
                    alt={product.isim}
                    className="w-full h-48 object-contain p-4"
                  />
                </div>
                <div className="p-4 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.isim}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm font-semibold text-red-600">
                      {/\d\s*(₺|\$|€)$/.test(product.fiyat.trim())
                        ? product.fiyat
                        : `${product.fiyat} ₺`}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-yellow-800">
                      Detay
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}