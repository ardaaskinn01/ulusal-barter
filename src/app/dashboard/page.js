"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, query, orderBy, collection, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import Navbar from "../components/Navbar";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const productTypes = [
    "Arsa", "Arazi", "Otel", "Hizmet", "Çiftlik", "Daire", "Villa", "Santral",
    "Restaurant", "Bahçe", "Tarla", "Parsel", "Tesis", "Zeytinlik", "Fabrika",
    "Beyaz Eşya", "Ofis", "Ev", "Taksi", "Tekstil", "Peyzaj", "Sera", "Estetik"
  ];
  const filteredProducts = products.filter(product => {
    const name = product.isim.toLowerCase();
    const locationMatch = name.includes(searchLocation.toLowerCase());

    const typeMatch = selectedTypes.length === 0 ||
      selectedTypes.some(type => name.includes(type.toLowerCase()));

    return locationMatch && typeMatch;
  });

  const fetchPendingRequests = async () => {
    try {
      const q = query(collection(db, "users"));
      const snapshot = await getDocs(q);
      const requests = snapshot.docs
        .filter(doc => doc.data().isAccept === false)
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingRequests(requests);
    } catch (error) {
      console.error("İstekler alınırken hata oluştu:", error);
    }
  };

  useEffect(() => {
    const checkPending = async () => {
      await fetchPendingRequests();
    };
    checkPending();
  }, []);


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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-yellow-500">
      <Navbar />



      {
        showRequestsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
              <h2 className="text-lg text-gray-500 font-bold mb-4">Onay Bekleyen İstekler</h2>
              {pendingRequests.length === 0 ? (
                <p className="text-gray-500">Onay bekleyen kullanıcı yok.</p>
              ) : (
                <ul className="space-y-3">
                  {pendingRequests.map((user) => (
                    <li key={user.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium text-gray-500">{user.ad} {user.soyad}</p>
                        <p className="text-sm text-gray-500">{user.adres}</p>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await updateDoc(doc(db, "users", user.id), { isAccept: true });
                            setPendingRequests(prev => prev.filter(u => u.id !== user.id));
                          } catch (err) {
                            console.error("Kullanıcı onaylanırken hata:", err);
                            alert("Bir hata oluştu.");
                          }
                        }}
                        className="text-green-600 hover:text-green-800"
                        title="Onayla"
                      >
                        ✔️
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => setShowRequestsModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>
          </div>
        )
      }

      {showFilterMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start">
          <div className="w-64 bg-white p-4 overflow-y-auto">
            <button
              onClick={() => setShowFilterMobile(false)}
              className="mb-6 w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Kapat
            </button>
            <FilterPanel
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              productTypes={productTypes}
            />
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="bg-yellow-300 shadow-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Hoşgeldiniz, {userData ? `${userData.ad} ${userData.soyad}` : "..."}</h1>
            <p className="text-gray-500 mt-1">{products.length} ürün listeleniyor</p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center">
            {userData?.role === "admin" && (
              <>
                {/* 1. ve 2. butonlar aynı satırda */}
                <button
                  onClick={() => router.push("/urun-ekle")}
                  className="px-3 py-1.5 bg-red-800 text-white text-sm font-medium rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Ürün Ekle
                </button>

                {/* 3. buton mobilde alt satıra düşsün */}
                <button
                  onClick={() => {
                    fetchPendingRequests();
                    setShowRequestsModal(true);
                  }}
                  className="relative px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-2"
                >
                  İstekleri Görüntüle
                  {pendingRequests.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {pendingRequests.length}
                    </span>
                  )}
                </button>
                <button
                  className="md:hidden px-3 py-1.5 bg-red-300 rounded-md text-white text-sm font-medium"
                  onClick={() => setShowFilterMobile(true)}
                >
                  Filtre
                </button>
              </>
            )}

            <button
              onClick={() => {
                signOut(auth).then(() => {
                  router.push("/uyelik");
                });
              }}
              className="px-3 py-1.5 bg-white border border-red-300 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-14 max-w-7xl mx-auto items-start">
          {/* Filtre Paneli */}
          <aside className="hidden md:block w-72 bg-white p-6 rounded-lg shadow-sm h-fit top-6">
            <FilterPanel
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              productTypes={productTypes}
            />
          </aside>

          {/* Ürünler - Düzeltilmiş versiyon */}
          + <section className="md:ml-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center col-span-full flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Sonuç bulunamadı</h3>
                <p className="text-gray-500">Filtre kriterlerinize uygun ürün bulunamadı.</p>
                <button
                  onClick={() => {
                    setSearchLocation('');
                    setSelectedTypes([]);
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("scrollPos", window.scrollY.toString());
                    }
                    router.push(`/urun/${encodeURIComponent(product.id)}`);
                  }}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-150 ease-in-out cursor-pointer flex flex-col h-full"
                >
                  <div className="aspect-w-1 aspect-h-1 bg-gray-50 relative flex-shrink-0">
                    <img
                      src={product.anaGorselUrl}
                      alt={product.isim}
                      className="w-full h-48 object-contain p-4"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-100 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px]">
                      {product.isim}
                    </h3>
                    <div className="mt-auto pt-2 flex justify-between items-center">
                      <p className="text-sm font-semibold text-red-600">
                        {/\d\s*(₺|\$|€)$/.test(product.fiyat.trim())
                          ? product.fiyat
                          : `${product.fiyat} ₺`}
                      </p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        Detay
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function FilterPanel({ searchLocation, setSearchLocation, selectedTypes, setSelectedTypes, productTypes }) {
  return (
    <>
      {/* Konum Arama */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Konum Ara</label>
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          placeholder="Şehir bölge ilçe..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Tür Checkbox Listesi - Scroll kaldırıldı */}
      <fieldset className="mb-6">
        <legend className="text-sm font-medium text-gray-700 mb-3">Tür</legend>
        <div className="space-y-2">
          {productTypes.map((type) => (
            <div key={type} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`filter-type-${type}`}
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTypes([...selectedTypes, type]);
                    } else {
                      setSelectedTypes(selectedTypes.filter(t => t !== type));
                    }
                  }}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <label htmlFor={`filter-type-${type}`} className="ml-3 text-sm text-gray-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </>
  );
}