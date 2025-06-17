"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc, setDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../../components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductDetail() {
    const [satildi, setSatildi] = useState(false);
    const { id: rawId } = useParams();
    const id = decodeURIComponent(rawId);
    const router = useRouter();
    const [hasOffered, setHasOffered] = useState(false);
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [offerAmount, setOfferAmount] = useState("");
    const [currency, setCurrency] = useState("₺");
    const [product, setProduct] = useState(null);
    const [modalUrl, setModalUrl] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [offerDocId, setOfferDocId] = useState(null);
    let favorites = [];
    const [isFavorited, setIsFavorited] = useState(false);

    const checkFavoriteStatus = async (productId) => {
        const user = auth.currentUser;
        if (!user) return false;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        favorites = userSnap.data()?.favorites || [];

        return favorites.some(fav => fav.ilanId === productId || fav.ilanIsmi === productId);
    };


    const openModal = (index) => {
        setCurrentIndex(index);
    };

    const closeModal = () => {
        setCurrentIndex(null);
    };

    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const goNext = () => {
        if (currentIndex < product.ekGorselUrl.length - 1)
            setCurrentIndex(currentIndex + 1);
    };

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);

                try {
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        if (userData.role === "admin") {
                            setIsAdmin(true);
                        }
                    }
                } catch (error) {
                    console.error("Kullanıcı bilgisi alınamadı:", error);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const productData = docSnap.data();
                    setProduct(productData);

                    if (currentUser && productData.userId === currentUser.uid) {
                        setCanEdit(true);
                    }

                    if ("satildi" in productData && productData.satildi === true) {
                        setSatildi(true);
                    }
                } else {
                    console.log("Ürün bulunamadı");
                }
            } catch (error) {
                console.error("Veri alınamadı:", error);
            }
        };

        fetchProduct();
    }, [id, currentUser]);

    useEffect(() => {
        const checkOffer = async () => {
            if (!currentUser || !id) return;

            try {
                const q = query(
                    collection(db, "offers"),
                    where("userId", "==", currentUser.uid),
                    where("productId", "==", id)
                );

                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Teklif bulunursa, hasOffered true yapılır ve ilk teklifin ID'si saklanır
                    const docId = querySnapshot.docs[0].id;
                    setHasOffered(true);
                    setOfferDocId(docId); // Bu ID, silme işleminde kullanılacak
                } else {
                    setHasOffered(false);
                    setOfferDocId(null);
                }
            } catch (err) {
                console.error("Teklif kontrolü sırasında hata:", err);
            }
        };

        checkOffer();
    }, [currentUser, id]);

    useEffect(() => {
        const fetchFavorite = async () => {
            const result = await checkFavoriteStatus(product.id);
            setIsFavorited(result);
        };
        fetchFavorite();
    }, [product.id]);

    const toggleFavorite = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);

        let newFavorites;

        if (isFavorited) {
            newFavorites = favorites.filter(fav => fav.ilanId !== product.id);
        } else {
            newFavorites = [...favorites, { ilanId: product.id }];
        }

        await updateDoc(userRef, { favorites: newFavorites });
        setIsFavorited(!isFavorited);
        favorites = newFavorites; // güncelle
    };

    const toggleSatildi = async () => {
        const confirmation = window.confirm(
            satildi
                ? "Bu ilanı tekrar 'satılmadı' olarak işaretlemek istiyor musunuz?"
                : "Bu ilanı 'satıldı' olarak işaretlemek istiyor musunuz?"
        );

        if (!confirmation) return;

        try {
            const docRef = doc(db, "products", id);
            await updateDoc(docRef, {
                satildi: !satildi,
            });
            setSatildi(!satildi);
        } catch (error) {
            console.error("Satıldı güncellenirken hata oluştu:", error);
        }
    };

    const handleOfferSubmit = async () => {
        // Noktaları sil, virgülü noktaya çevir → sayıya dönüştür
        const numericAmount = parseFloat(offerAmount.replace(/\./g, '').replace(',', '.'));

        if (!numericAmount || isNaN(numericAmount)) {
            alert("Geçerli bir miktar giriniz.");
            return;
        }

        try {
            // 1. Kullanıcının Firestore'daki bilgilerini al
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            let fullName = "Bilinmeyen Kullanıcı";
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                fullName = `${userData.ad || ""} ${userData.soyad || ""}`.trim();
            }

            // 2. Rastgele ID oluştur
            const randomId = uuidv4();

            // 3. Teklif verisini yaz
            const offerRef = doc(db, "offers", randomId);
            await setDoc(offerRef, {
                userId: currentUser.uid,
                productId: id,
                amount: numericAmount, // <-- Temizlenmiş sayı
                currency: currency,
                createdAt: new Date(),
                userName: fullName
            });

            setHasOffered(true);
            setShowOfferModal(false);
            alert("Teklif başarıyla verildi.");
        } catch (error) {
            console.error("Teklif verirken hata oluştu:", error);
            alert("Bir hata oluştu.");
        }
    };

    const handleWithdrawOffer = async () => {
        try {
            if (!offerDocId) return alert("Silinecek teklif bulunamadı.");

            await deleteDoc(doc(db, "offers", offerDocId));
            setHasOffered(false);
            setOfferDocId(null);
            alert("Teklif geri çekildi.");
        } catch (err) {
            console.error("Geri çekme hatası:", err);
            alert("Teklif geri çekilirken hata oluştu.");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Bu ürünü silmek istediğinize emin misiniz?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "products", id));
            alert("Ürün silindi.");
            router.push("/dashboard");
        } catch (error) {
            console.error("Silme hatası:", error);
            alert("Ürün silinirken bir hata oluştu.");
        }
    };

    const handleEdit = () => {
        router.push(`/urun-ekle?edit=${encodeURIComponent(id)}`);
    };

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-yellow-600 to-yellow-400 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-yellow-600 rounded-full mb-4"></div>
                    <div className="text-yellow-800 font-medium">Yükleniyor...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-400 text-yellow-400">
            <Navbar />

            {showOfferModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Teklif Ver</h2>

                        <input
                            type="text"
                            placeholder="Miktar girin"
                            className="w-full border px-4 py-2 mb-4 rounded"
                            value={offerAmount}
                            onChange={(e) => {
                                let rawValue = e.target.value;

                                // Sadece rakamları al (virgül varsa al, nokta yok!)
                                rawValue = rawValue.replace(/[^\d,]/g, '');

                                // Virgülden sonra sadece 2 hane olacak şekilde sınırla
                                const [intPart, decimalPart] = rawValue.split(',');
                                let formattedInt = intPart.replace(/^0+/, ''); // baştaki sıfırları sil
                                formattedInt = formattedInt.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

                                let result = formattedInt;
                                if (decimalPart !== undefined) {
                                    result += ',' + decimalPart.slice(0, 2);
                                }

                                setOfferAmount(result);
                            }}
                        />


                        <select
                            className="w-full border px-4 py-2 mb-4 rounded"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="₺">TL</option>
                            <option value="$">USD</option>
                            <option value="€">EUR</option>
                        </select>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowOfferModal(false)}
                                className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-900"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleOfferSubmit}
                                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Gönder
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-6 py-24 relative md:mt-24 mt-16">
                {/* Sağ üstte ilan numarası kutusu */}
                <div className="text-sm absolute top-20 right-0 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg z-20">
                    İlan Numarası: {product.id}
                </div>

                <div className="relative top-6 mb-12 border-b border-gray-300 pb-12 text-center">
                    {/* Başlık */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        {product.isim}
                    </h1>

                    {/* Fiyat - Başlığın altında */}
                    {product.fiyat && (
                        <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-red-600 bg-white inline-block px-6 py-2 rounded-xl shadow-sm">
                            Fiyat: {
                                /\d\s*(₺|\$|€)$/.test(product.fiyat.trim())
                                    ? product.fiyat
                                    : `${product.fiyat} ₺`
                            }
                        </div>
                    )}
                </div>

                {/* Grid yapısı */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Görseller */}
                    <div className="space-y-8">
                        {/* Ana görsel */}
                        <div className="w-full h-[420px] bg-white shadow-xl rounded-2xl overflow-hidden flex items-center justify-center hover:shadow-2xl transition">
                            <img
                                src={product.anaGorselUrl}
                                alt="Ürün Ana Görseli"
                                className="object-contain max-h-full cursor-pointer"
                                onClick={() => setModalUrl(product.anaGorselUrl)}
                            />
                        </div>

                        {/* Ek görseller */}
                        {product.ekGorselUrl?.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Diğer Medya</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.ekGorselUrl.map((url, idx) => (
                                        <div
                                            key={idx}
                                            className="aspect-square bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
                                        >
                                            {url.endsWith('.mp4') ? (
                                                <video
                                                    controls
                                                    src={url}
                                                    className="w-full h-full object-cover cursor-pointer"
                                                    onClick={() => openModal(idx)}
                                                />
                                            ) : (
                                                <img
                                                    src={url}
                                                    alt={`Görsel ${idx + 1}`}
                                                    className="w-full h-full object-cover cursor-pointer"
                                                    onClick={() => openModal(idx)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ürün Detayları */}
                    <div className="space-y-8">
                        <div className="bg-white shadow-xl rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ürün Detayları</h2>
                            {product.aciklamalar?.length > 0 ? (
                                <ul className="list-none list-inside space-y-3 text-gray-700 leading-relaxed">
                                    {product.aciklamalar.map((desc, idx) => (
                                        <li key={idx}>{desc}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">Açıklama bulunamadı.</p>
                            )}
                        </div>

                        {(isAdmin || canEdit) ? (
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg shadow-lg transition"
                                >
                                    Düzenle
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
                                >
                                    Sil
                                </button>
                                <button
                                    onClick={toggleSatildi}
                                    className={`flex items-center gap-2 ${satildi ? "bg-gray-600 hover:bg-gray-700" : "bg-red-400 hover:bg-red-500"
                                        } text-white px-6 py-3 rounded-lg shadow-lg transition`}
                                >
                                    {satildi ? "İşareti Geri Al" : "Satıldı İşaretle"}
                                </button>
                            </div>
                        ) : (
                            currentUser && !satildi && ( // 🔴 Satıldıysa gösterme!
                                <div className="mt-6">
                                    {!hasOffered ? (
                                        <button
                                            onClick={() => setShowOfferModal(true)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
                                        >
                                            Teklif Ver
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleWithdrawOffer}
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
                                        >
                                            Teklifi Geri Çek
                                        </button>
                                    )}
                                    <button
                                        onClick={toggleFavorite}
                                        className={`px-4 py-2 rounded ${isFavorited ? "bg-gray-400" : "bg-red-500"} text-white`}
                                    >
                                        {isFavorited ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {currentIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6">
                    <div className="relative max-w-4xl w-full flex items-center justify-center">
                        {/* Sol Ok */}
                        <button
                            onClick={goPrev}
                            disabled={currentIndex === 0}
                            className="absolute left-4 text-white text-4xl z-10 px-2 py-1 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full"
                        >
                            &#8592;
                        </button>

                        {product.ekGorselUrl[currentIndex].endsWith('.mp4') ? (
                            <video
                                src={product.ekGorselUrl[currentIndex]}
                                controls
                                className="w-full rounded-xl object-contain max-h-[85vh]"
                            />
                        ) : (
                            <img
                                src={product.ekGorselUrl[currentIndex]}
                                alt={`Görsel ${currentIndex + 1}`}
                                className="w-full rounded-xl object-contain max-h-[85vh]"
                            />
                        )}

                        {/* Sağ Ok */}
                        <button
                            onClick={goNext}
                            disabled={currentIndex === product.ekGorselUrl.length - 1}
                            className="absolute right-4 text-white text-4xl z-10 px-2 py-1 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full"
                        >
                            &#8594;
                        </button>

                        {/* Kapat Butonu */}
                        <button
                            className="absolute top-4 right-4 text-white text-4xl"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
}