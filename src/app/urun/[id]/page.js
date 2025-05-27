"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../../components/Navbar";

export default function ProductDetail() {
    const { id: rawId } = useParams();
    const id = decodeURIComponent(rawId);
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [modalUrl, setModalUrl] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [canEdit, setCanEdit] = useState(false); // 👈 Ekle

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

                        // Admin kontrolü
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

                    // 👤 Kullanıcı kendi ürününü eklediyse düzenleyebilir
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
        return <div className="p-10 text-center text-xl">Yükleniyor...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-yellow-400 p-4 sm:p-24">
            <Navbar />

            <div className="max-w-5xl mx-auto bg-gray-200 rounded-xl shadow-lg p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:flex-row md:space-x-8">
                {/* Açıklamalar ve Başlık */}
                <div className="order-2 md:order-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.isim}</h1>

                    {product.fiyat && (
                        <div className="bg-yellow-500 text-white px-4 py-2 inline-block rounded font-semibold text-lg mb-4">
                            {product.fiyat} TL
                        </div>
                    )}

                    {product.aciklamalar?.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {product.aciklamalar.map((desc, idx) => (
                                <li key={idx}>{desc}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Açıklama bulunamadı.</p>
                    )}

                    {/* 🔧 Admin veya ürün sahibi ise butonları göster */}
                    {(isAdmin || canEdit) && (
                        <div className="mt-6 space-x-4">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                onClick={handleEdit}
                            >
                                Düzenle
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                Sil
                            </button>
                        </div>
                    )}
                </div>

                {/* Görseller */}
                <div className="order-1 md:order-2 flex flex-col space-y-4">
                    <img
                        src={product.anaGorselUrl}
                        alt="Ana Görsel"
                        className="w-full h-auto rounded-lg shadow cursor-pointer"
                        onClick={() => setModalUrl(product.anaGorselUrl)}
                    />
                    {product.ekGorselUrl?.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {product.ekGorselUrl.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`Ek Görsel ${idx + 1}`}
                                    className="w-full h-auto rounded shadow cursor-pointer"
                                    onClick={() => setModalUrl(url)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {modalUrl && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setModalUrl(null)}
                >
                    <img src={modalUrl} alt="Odak" className="max-w-full max-h-full rounded-lg shadow-lg" />
                </div>
            )}
        </div>
    );
}