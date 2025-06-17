"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { writeBatch, doc, getDoc, query, orderBy, collection, getDocs, updateDoc, where, addDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import Navbar from "../components/Navbar";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]); // user rolündeki kullanıcılar
  const [balanceInputs, setBalanceInputs] = useState({});
  const [descriptionInputs, setDescriptionInputs] = useState({});
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [soldFilter, setSoldFilter] = useState("all");
  const normalizedSearch = normalizeString(searchLocation.trim());
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showOffersModal, setShowOffersModal] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [offers, setOffers] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const productTypes = [
    "Arsa", "Arazi", "Otel", "Hizmet", "Çiftlik", "Daire", "Villa", "Santral",
    "Restaurant", "Bahçe", "Tarla", "Parsel", "Tesis", "Zeytinlik", "Fabrika",
    "Beyaz Eşya", "Ofis", "Ev", "Malikane", "Tatil Köyü", "Taksi", "Tekstil", "Peyzaj", "Sera", "Estetik"
  ];

  function normalizeString(str) {
    if (!str) return ""; // Eğer boşsa boş string döndür

    const charMap = {
      ç: "c", Ç: "c",
      ğ: "i", Ġ: "g", // Ekstra Türkçe karakterler
      ı: "i", İ: "i", // ÖNEMLİ: Büyük İ için eşleme
      ö: "o", Ö: "o",
      ş: "s", Ş: "s",
      ü: "u", Ü: "u",
      Ğ: "g", ğ: "g"
    };

    return str
      .toString() // String'e garantiye al
      .toLowerCase() // Önce küçült
      .replace(/[ÇĞİÖŞÜçğıöşü]/g, char => charMap[char] || char) // Türkçe karakterleri değiştir
      .replace(/[^a-z0-9]/g, ""); // Sadece harf ve rakam kalsın (opsiyonel)
  }

  const filteredProducts = products.filter(product => {
    const productName = normalizeString(product.isim || "");
    const searchTerm = normalizeString(searchLocation || "");

    // Konum eşleşmesi (arama terimi boşsa veya isimde geçiyorsa)
    const locationMatch = !searchTerm || productName.includes(searchTerm);

    // Tür eşleşmesi (seçili tür yoksa veya isimde geçiyorsa)
    const typeMatch = selectedTypes.length === 0 ||
      selectedTypes.some(type => productName.includes(normalizeString(type)));

    const soldMatch =
      soldFilter === "all"
        ? true
        : soldFilter === "sold"
          ? product.satildi === true
          : !("satildi" in product) || product.satildi === false;

    return locationMatch && typeMatch && soldMatch;
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

  const fetchProducts = async () => {
    try {
      const q = query(
        collection(db, "products"),
        orderBy("sabitle", "desc"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
      setLoading(false);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = getAuth().currentUser;
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      setFavorites(userData?.favorites || []);
    };

    fetchFavorites();
  }, []);


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
  useEffect(() => { fetchProducts(); }, []);


  useEffect(() => {
    if (!showOffersModal) return;

    const q = query(collection(db, "offers"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOffers(data);
    });

    return () => unsubscribe();
  }, [showOffersModal]);

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


  const openOffersModal = () => {
    setShowOffersModal(true);
  };

  const closeOffersModal = () => {
    setShowOffersModal(false);
  };

  const goToProductPage = (productId) => {
    closeOffersModal();
    router.push(`/urun/${productId}`);
  };

  const openBalanceModal = async () => {
    try {
      // user rolündeki kullanıcıları çek (örneğin Firestore’dan)
      const usersSnapshot = await getDocs(query(collection(db, "users"), where("role", "==", "user")));
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllUsers(usersList);
      setShowBalanceModal(true);
    } catch (err) {
      console.error("Kullanıcılar alınırken hata:", err);
      alert("Kullanıcılar alınırken hata oluştu.");
    }
  }

  // input değişim fonksiyonu
  const handleBalanceInputChange = (userId, value) => {
    const formattedValue = formatBalanceInput(value);
    setBalanceInputs(prev => ({ ...prev, [userId]: formattedValue }));
  };

  const handleDescriptionInputChange = (userId, value) => {
    setDescriptionInputs(prev => ({ ...prev, [userId]: value }));
  };

  const formatBalanceInput = (value) => {
    // Sayı olmayan karakterleri temizle
    value = value.replace(/[^\d]/g, '');

    const len = value.length;

    if (len <= 3) return value;

    if (len === 4) {
      return value.replace(/(\d{1})(\d{3})/, '$1.$2');
    }

    if (len === 5) {
      return value.replace(/(\d{2})(\d{3})/, '$1.$2');
    }

    if (len === 6) {
      return value.replace(/(\d{3})(\d{3})/, '$1.$2');
    }

    if (len === 7) {
      return value.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3');
    }

    if (len === 8) {
      return value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
    }

    if (len === 9) {
      return value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    }

    if (len === 10) {
      return value.replace(/(\d{1})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4');
    }

    if (len === 11) {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4');
    }

    // Daha fazlası için genel binlik ayraç eklemesi
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // bakiye ekleme işlemi
  const addBalance = async (userId) => {
    try {
      let val = balanceInputs[userId];
      const desc = descriptionInputs[userId];

      if (!val) return alert("Lütfen bakiye miktarı girin.");
      val = val.replace(/[.,]/g, '');
      const amount = parseInt(val, 10);

      if (isNaN(amount) || amount <= 0) return alert("Geçerli bir bakiye miktarı girin.");
      if (!desc) return alert("Lütfen açıklama girin.");

      const userRef = doc(db, "users", userId);
      const user = allUsers.find(u => u.id === userId);
      const currentBalance = parseInt(user.bakiye, 10) || 0;
      const newBalance = currentBalance + amount;

      await updateDoc(userRef, { bakiye: newBalance });

      const transactionRef = collection(db, `users/${userId}/bakiye_gecmisi`);
      await addDoc(transactionRef, {
        miktar: amount,
        aciklama: desc,
        islemTuru: "ekle",
        tarih: new Date()
      });

      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, bakiye: newBalance } : u));
      setBalanceInputs(prev => ({ ...prev, [userId]: '' }));
      setDescriptionInputs(prev => ({ ...prev, [userId]: '' }));
      alert("Bakiye başarıyla eklendi.");
    } catch (err) {
      console.error("Bakiye eklenirken hata:", err);
      alert("Hata oluştu.");
    }
  };



  const subtractBalance = async (userId) => {
    try {
      let val = balanceInputs[userId];
      const desc = descriptionInputs[userId];

      if (!val) return alert("Lütfen bakiye miktarı girin.");
      val = val.replace(/[.,]/g, '');
      const amount = parseInt(val, 10);

      if (isNaN(amount) || amount <= 0) return alert("Geçerli bir bakiye miktarı girin.");
      if (!desc) return alert("Lütfen açıklama girin.");

      const userRef = doc(db, "users", userId);
      const user = allUsers.find(u => u.id === userId);
      const currentBalance = parseInt(user.bakiye, 10) || 0;

      if (currentBalance < amount) return alert("Yetersiz bakiye.");

      const newBalance = currentBalance - amount;
      await updateDoc(userRef, { bakiye: newBalance });

      const transactionRef = collection(db, `users/${userId}/bakiye_gecmisi`);
      await addDoc(transactionRef, {
        miktar: amount,
        aciklama: desc,
        islemTuru: "çıkar",
        tarih: new Date()
      });

      setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, bakiye: newBalance } : u));
      setBalanceInputs(prev => ({ ...prev, [userId]: '' }));
      setDescriptionInputs(prev => ({ ...prev, [userId]: '' }));
      alert("Bakiye başarıyla çıkarıldı.");
    } catch (err) {
      console.error("Bakiye çıkarılırken hata:", err);
      alert("Hata oluştu.");
    }
  };


  const openTransactionHistory = async (userId) => {
    const transactionRef = collection(db, `users/${userId}/bakiye_gecmisi`);
    const q = query(transactionRef, orderBy("tarih", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTransactions(data);
    setSelectedUserId(userId);
    setShowTransactionModal(true);
  };

  const handleShowOwnTransactions = async () => {
    if (!userData?.uid) return;

    const snapshot = await getDocs(collection(db, "users", userData.uid, "bakiye_gecmisi"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTransactions(data);
    setShowTransactionModal(true);
  };

  return (
    <div className="min-h-screen bg-yellow-500">
      <Navbar />

      {showBalanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-yellow-300 p-6 rounded-lg max-w-3xl w-full shadow-lg relative">
            <h2 className="text-xl font-bold text-black mb-4 border-b border-yellow-600 pb-2">
              Kullanıcı Bakiyeleri
            </h2>

            <div className="max-h-96 overflow-y-auto">
              {allUsers.length === 0 ? (
                <p className="text-black">User rolünde kayıtlı kullanıcı bulunamadı.</p>
              ) : (
                <table className="w-full text-black">
                  <thead>
                    <tr className="border-b border-yellow-600">
                      <th className="py-2 text-left">Ad Soyad / Bakiye</th>
                      <th className="py-2 text-center">Miktar</th>
                      <th className="py-2 text-center">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map(user => (
                      <tr key={user.id} className="border-b border-yellow-200">
                        <td className="py-2">
                          <div className="font-semibold">{user.ad} {user.soyad}</div>
                          <div className="text-sm text-gray-700 font-mono">
                            {formatBalanceInput((user.bakiye ?? 0).toString())} ₺
                          </div>
                        </td>
                        <td className="py-2 text-center">
                          <input
                            type="text"
                            placeholder="Miktar"
                            value={balanceInputs[user.id] || ""}
                            onChange={e => handleBalanceInputChange(user.id, e.target.value)}
                            className="border border-yellow-600 rounded-md px-2 py-1 w-24 text-right focus:outline-yellow-500"
                          />
                          <input
                            type="text"
                            placeholder="Açıklama"
                            value={descriptionInputs[user.id] || ""}
                            onChange={e => handleDescriptionInputChange(user.id, e.target.value)}
                            className="border border-yellow-600 rounded-md px-2 py-1 w-full mt-1 text-left"
                          />
                        </td>
                        <td className="py-2 text-center">
                          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                            <button
                              onClick={() => addBalance(user.id)}
                              className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-md font-semibold"
                            >
                              Ekle
                            </button>
                            <button
                              onClick={() => subtractBalance(user.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-semibold"
                            >
                              Çıkar
                            </button>
                            <button
                              onClick={() => openTransactionHistory(user.id)}
                              className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md font-semibold"
                            >
                              Geçmiş
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              )}
            </div>

            <button
              onClick={() => setShowBalanceModal(false)}
              className="absolute top-2 right-2 text-black hover:text-yellow-700 font-bold text-xl"
              title="Kapat"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showTransactionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <h2 className="text-xl font-bold text-gray-900 mb-4">İşlem Geçmişi</h2>
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {transactions.length === 0 ? (
                <li className="text-black">Geçmiş bulunamadı.</li>
              ) : (
                [...transactions] // Orijinal listeyi bozmamak için kopyala
                  .sort((a, b) => b.tarih.toDate() - a.tarih.toDate()) // Tarihe göre azalan sırala
                  .map(t => {
                    const islemTuruText =
                      t.islemTuru === 'ekle' ? 'Ekleme' :
                        t.islemTuru === 'çıkar' ? 'Çıkarma' :
                          t.islemTuru;

                    const colorClass =
                      t.islemTuru === 'ekle' ? 'text-green-600' :
                        t.islemTuru === 'çıkar' ? 'text-red-600' :
                          'text-yellow-600';

                    return (
                      <li key={t.id} className="border p-2 rounded-md">
                        <p className="text-sm text-black">📅 {new Date(t.tarih.toDate()).toLocaleString()}</p>
                        <p className={`font-semibold ${colorClass}`}>
                          {islemTuruText}: {t.miktar} ₺
                        </p>
                        <p className="text-black">{t.aciklama}</p>
                      </li>
                    );
                  })
              )}
            </ul>
            <button
              onClick={() => setShowTransactionModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

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

      {showOffersModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={closeOffersModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[80vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()} // Modal içi tıklamayı engelle
          >
            <h2 className="text-xl font-bold mb-4 text-yellow-600">Teklifler</h2>
            {offers.length === 0 ? (
              <p className="text-gray-600">Henüz teklif yok.</p>
            ) : (
              <ul>
                {offers.map((offer) => (
                  <li
                    key={offer.id}
                    onClick={() => goToProductPage(offer.productId)}
                    className="cursor-pointer p-3 rounded hover:bg-yellow-100 transition-colors mb-2 border border-yellow-300"
                  >
                    <p className="text-sm text-gray-500 italic">
                      <strong>Miktar:</strong>{" "}
                      {offer.amount?.toLocaleString("tr-TR")} {offer.currency || ""}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      <strong>Teklif Veren:</strong> {offer.userName || "Bilinmeyen"}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      {offer.productId}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={closeOffersModal}
              className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

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
              setSoldFilter={setSoldFilter}
              soldFilter={soldFilter}
            />
          </div>
        </div>
      )}

      <header className="bg-yellow-300 shadow-sm mt-40">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Hoşgeldiniz, {userData ? `${userData.ad} ${userData.soyad}` : "..."}
            </h1>
            <p className="text-gray-500 mt-1">{products.length} ürün listeleniyor</p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 items-center">

            {/* Kullanıcı rolleri */}
            {userData?.role === "user" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-red-500">
                  Barter Bakiyesi: {userData.bakiye?.toLocaleString("tr-TR")} ₺
                </span>
                <button
                  onClick={handleShowOwnTransactions}
                  className="px-2 py-1.5 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none"
                >
                  Hesap Geçmişi
                </button>
                {favorites.length > 0 ? (
                  <div className>
                    <button
                      onClick={() => setShowFavorites(true)}
                      className="bg-red-400 hover:bg-red-500 text-white text-sm px-2 py-1.5 rounded shadow font-medium"
                    >
                      Favorilerim
                    </button>

                    {showFavorites && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                          <h2 className="text-xl text-black font-bold mb-4 text-center">Favori İlanlarım</h2>
                          <ul className="space-y-3 max-h-64 overflow-y-auto">
                            {favorites.map((ilan, index) => (
                              <li
                                key={index}
                                className="p-3 bg-yellow-100 rounded-lg cursor-pointer hover:bg-yellow-200 text-black" // ← text-black eklendi
                                onClick={() => {
                                  setShowFavorites(false);
                                  router.push(`/urun/${ilan.ilanId}`);
                                }}
                              >
                                {ilan.ilanId || "İsimsiz İlan"}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 text-center">
                            <button
                              onClick={() => setShowFavorites(false)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Kapat
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => alert("Favorilere eklenmiş ilan bulunamadı.")}
                    className="bg-red-400 hover:bg-red-500 text-white px-2 py-1.5 text-sm font-medium rounded shadow"
                  >
                    Favorilerim
                  </button>
                )}
              </div>

            )}

            {userData?.role === "admin" && (
              <>
                <button
                  onClick={openBalanceModal}
                  className="px-3 py-1.5 bg-red-900 text-white text-sm font-medium rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Bakiye Takip
                </button>

                <button
                  onClick={() => router.push("/urun-ekle")}
                  className="px-3 py-1.5 bg-red-700 text-white text-sm font-medium rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Ürün Ekle
                </button>

                <button
                  onClick={() => {
                    fetchPendingRequests();
                    setShowRequestsModal(true);
                  }}
                  className="relative px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  İstekleri Görüntüle
                  {pendingRequests.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {pendingRequests.length}
                    </span>
                  )}
                </button>

                {/* Yeni teklifler butonu */}
                <button
                  onClick={openOffersModal}
                  className="px-3 py-1.5 bg-red-300 text-white text-sm font-medium rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Teklifler
                </button>
              </>
            )}

            <button
              className="md:hidden px-3 py-1.5 bg-red-100 rounded-md text-black text-sm font-medium"
              onClick={() => setShowFilterMobile(true)}
            >
              Filtre
            </button>

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
          <aside className="hidden md:block w-80 bg-white p-6 rounded-lg shadow-sm h-fit top-6">
            <FilterPanel
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              productTypes={productTypes}
              soldFilter={soldFilter}
              setSoldFilter={setSoldFilter}
            />
          </aside>

          {/* Ürünler - Düzeltilmiş versiyon */}
          <section className="md:ml-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  key={product.isim}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("scrollPos", window.scrollY.toString());
                    }
                    router.push(`/urun/${encodeURIComponent(product.isim)}`);
                  }}
                  className={`group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-150 ease-in-out cursor-pointer flex flex-col h-full ${"satildi" in product && product.satildi === true ? "opacity-50" : ""
                    }`}
                >
                  {/* SATILDI etiketi */}
                  {("satildi" in product && product.satildi === true) && (
                    <div className="absolute top-7 left-[-32px] -rotate-12 bg-red-600 text-white font-bold px-12 py-1 text-sm shadow-lg z-10">
                      TAKASIMIZ GERÇEKLEŞTİRİLMİŞTİR.
                    </div>
                  )}

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
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer
    ${userData?.role === "admin"
                            ? (product.sabitle ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800")
                            : "bg-indigo-100 text-indigo-800"}`}
                        onClick={async (e) => {
                          e.stopPropagation();

                          if (userData?.role === "admin") {
                            try {
                              const newSabitle = !product.sabitle;

                              await updateDoc(doc(db, "products", product.isim), {
                                sabitle: newSabitle,
                              });

                              // UI anlık güncellensin
                              setProducts(prev =>
                                prev.map(p =>
                                  p.id === product.id ? { ...p, sabitle: newSabitle } : p
                                )
                              );

                              fetchProducts(); // opsiyonel: sıralama güncellenecekse
                              alert(`Ürün ${newSabitle ? "sabitlendi" : "sıralamaya geri alındı"}.`);
                            } catch (error) {
                              console.error("Sabitleme/Kaldırma hatası:", error);
                            }
                          } else {
                            router.push(`/urun/${encodeURIComponent(product.isim)}`);
                          }
                        }}
                      >
                        {userData?.role === "admin"
                          ? product.sabitle
                            ? "Üstten Kaldır"
                            : "Üste Sabitle"
                          : "Detay"}
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

function FilterPanel({ searchLocation, setSearchLocation, selectedTypes, setSelectedTypes, productTypes, soldFilter, setSoldFilter }) {
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
          className="w-full border border-gray-300 text-gray-500 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

      <fieldset className="mb-6">
        <legend className="text-sm font-medium text-gray-700 mb-3">Satış Durumu</legend>
        <div className="space-y-2">
          <div className="flex items-start">
            <input
              id="filter-sold-all"
              type="radio"
              value="all"
              checked={soldFilter === "all"}
              onChange={() => setSoldFilter("all")}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="filter-sold-all" className="ml-3 text-sm text-gray-700">Tümü</label>
          </div>
          <div className="flex items-start">
            <input
              id="filter-sold-unsold"
              type="radio"
              value="unsold"
              checked={soldFilter === "unsold"}
              onChange={() => setSoldFilter("unsold")}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="filter-sold-unsold" className="ml-3 text-sm text-gray-700">Satılmayanlar</label>
          </div>
          <div className="flex items-start">
            <input
              id="filter-sold-sold"
              type="radio"
              value="sold"
              checked={soldFilter === "sold"}
              onChange={() => setSoldFilter("sold")}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="filter-sold-sold" className="ml-3 text-sm text-gray-700">Satılanlar</label>
          </div>
        </div>
      </fieldset>

    </>
  );
}