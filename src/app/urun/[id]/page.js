"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

import Navbar from "../../components/Navbar";

export default function ProductDetail() {
    const { id: rawId } = useParams();
    const id = decodeURIComponent(rawId);
    const [product, setProduct] = useState(null);
    const [modalUrl, setModalUrl] = useState(null); // Modal için

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    console.log("Ürün bulunamadı");
                }
            } catch (error) {
                console.error("Veri alınamadı:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div className="p-10 text-center text-xl">Yükleniyor...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-yellow-400 p-4 sm:p-8">
            <Navbar />

            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-32 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sol: Başlık + Açıklama */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.isim}</h1>

                    {product.aciklamalar && product.aciklamalar.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {product.aciklamalar.map((desc, idx) => (
                                <li key={idx}>{desc}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Açıklama bulunamadı.</p>
                    )}
                </div>

                {/* Sağ: Görseller */}
                <div className="flex flex-col space-y-4">
                    <img
                        src={product.anaGorselUrl}
                        alt="Ana Görsel"
                        className="w-full h-auto rounded-lg shadow cursor-pointer"
                        onClick={() => setModalUrl(product.anaGorselUrl)}
                    />

                    {product.ekGorselUrl && product.ekGorselUrl.length > 0 && (
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

            {/* Modal (Odaklanmış büyük görsel) */}
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