"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../../components/Navbar";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductDetail() {
    const { id: rawId } = useParams();
    const id = decodeURIComponent(rawId);
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [modalUrl, setModalUrl] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

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
                } else {
                    console.log("Ürün bulunamadı");
                }
            } catch (error) {
                console.error("Veri alınamadı:", error);
            }
        };

        fetchProduct();
    }, [id, currentUser]);

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

            <div className="container mx-auto px-6 py-24">
                <div className="relative mb-16 border-b border-gray-300 pb-16 text-center">

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

                        {/* Admin Butonları */}
                        {(isAdmin || canEdit) && (
                            <div className="flex gap-4">
                                <button
                                    className="flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg shadow-lg transition"
                                    onClick={handleEdit}
                                >
                                    Düzenle
                                </button>
                                <button
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition"
                                    onClick={handleDelete}
                                >
                                    Sil
                                </button>
                            </div>
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