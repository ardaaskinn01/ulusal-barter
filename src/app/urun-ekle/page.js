"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../supabase";

const sanitizeFileName = (text) => {
    return text
        .toLowerCase()
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ü/g, "u")
        .replace(/[^a-z0-9_-]/g, "-");
};

function UrunEkleContent() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [mainImageUrl, setMainImageUrl] = useState("");
    const [extraImages, setExtraImages] = useState([]);
    const [extraImageUrls, setExtraImageUrls] = useState([]);
    const [descriptions, setDescriptions] = useState([""]);
    const [createdAt, setCreatedAt] = useState(null);
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        setUser(auth.currentUser);
    }, []);

    useEffect(() => {
        const fetchProductToEdit = async () => {
            if (!editId) return;

            try {
                const docRef = doc(db, "products", editId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProductName(data.isim || "");
                    setPrice(data.fiyat || "");
                    setDescriptions(data.aciklamalar || [""]);
                    setMainImageUrl(data.anaGorselUrl || "");
                    setExtraImageUrls(data.ekGorselUrl || []);
                    setCreatedAt(data.createdAt || null);  // burası önemli
                } else {
                    alert("Düzenlenecek ürün bulunamadı.");
                }
            } catch (err) {
                console.error("Ürün getirilirken hata:", err);
            }
        };

        fetchProductToEdit();
    }, [editId]);

    const handleAddDescription = () => {
        setDescriptions([...descriptions, ""]);
    };

    const handleDeleteDescription = () => {
        if (descriptions.length > 1) {
            setDescriptions(descriptions.slice(0, -1)); // son öğeyi siler
        }
    };

    const handleDescriptionChange = (index, value) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
    };

    const handleExtraImageAdd = (e) => {
        if (e.target.files) {
            setExtraImages([...extraImages, ...Array.from(e.target.files)]);
        }
    };

    const uploadToSupabase = async (file, path) => {
        const { error } = await supabase.storage
            .from("products")
            .upload(path, file, { upsert: true });

        if (error) {
            console.error("Supabase upload hatası detay:", error);
            throw error;
        }

        const { data } = supabase.storage.from("products").getPublicUrl(path);
        return data.publicUrl;
    };

    const handleSubmit = async () => {
        if (!productName || !price || (!mainImage && !mainImageUrl)) {
            alert("Lütfen ürün ismi, fiyat ve ana görsel ekleyin.");
            return;
        }

        if (!user) {
            alert("Kullanıcı bilgisi alınamadı.");
            return;
        }

        const safeProductName = sanitizeFileName(productName);
        const productRef = doc(db, "products", productName);

        try {
            let uploadedMainImageUrl = mainImageUrl;

            // Yeni ana görsel yüklendiyse, güncelle
            if (mainImage) {
                const mainExt = getExtensionByType(mainImage.type);
                uploadedMainImageUrl = await uploadToSupabase(mainImage, `${safeProductName}/main.${mainExt}`);
            }

            const uploadedExtraImageUrls = [...extraImageUrls];

            // Yeni ek görseller varsa, onları da ekle
            for (let i = 0; i < extraImages.length; i++) {
                const file = extraImages[i];
                const ext = getExtensionByType(file.type);
                const url = await uploadToSupabase(file, `${safeProductName}/extra_${uploadedExtraImageUrls.length + i}.${ext}`);
                uploadedExtraImageUrls.push(url);
            }

            await setDoc(productRef, {
                isim: productName,
                fiyat: price,
                anaGorselUrl: uploadedMainImageUrl,
                ekGorselUrl: uploadedExtraImageUrls,
                aciklamalar: descriptions,
                userId: user.uid,
                createdAt: createdAt || serverTimestamp(),  // varsa eskiyi kullan yoksa yenisini ata
            });

            alert("Ürün başarıyla kaydedildi!");
            router.push("/dashboard");
        } catch (error) {
            console.error("Hata detayları:", error);
            alert("Ürün kaydında hata: " + (error.message || error));
        }
    };


    function getExtensionByType(type) {
        if (type.includes("image/jpeg")) return "jpg";
        if (type.includes("image/png")) return "png";
        if (type.includes("video/mp4")) return "mp4";
        return ""; // bilinmeyen tip
    }

    return (
        <div className="min-h-screen bg-yellow-500 p-6">
            <h1 className="text-3xl text-white font-bold mb-6">Ürün Ekle</h1>

            {/* Ürün İsmi */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Ürün İsmi:</label>
                <input
                    type="text"
                    className="w-full text-black border p-2 rounded"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>

            {/* Fiyat Bilgisi */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Fiyat:</label>
                <input
                    type="text"
                    className="w-full text-black border p-2 rounded"
                    value={originalPrice}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^\d*\.?\d*$/.test(inputValue)) {
                            setOriginalPrice(inputValue);
                            const multipliedValue = inputValue === '' ? '' : parseFloat(inputValue) * 1.75;
                            setPrice(multipliedValue.toString());
                        }
                    }}
                    placeholder="Fiyat"
                />
            </div>

            {/* Ana Görsel */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Ürün Görseli:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setMainImage(e.target.files ? e.target.files[0] : null)
                    }
                />
                {mainImage && <p className="mt-2">Seçilen: {mainImage.name}</p>}
            </div>

            {/* Ek Görseller */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold">Ek Medya:</label>
                <input type="file" accept="image/*,video/*" multiple onChange={handleExtraImageAdd} />
                <ul className="mt-2 list-disc list-inside">
                    {extraImages.map((img, i) => (
                        <li key={i}>
                            {img.name} –{" "}
                            {img.type.startsWith("image/") ? "Görsel" : img.type.startsWith("video/") ? "Video" : "Diğer"}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Açıklamalar */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold">Ürün Açıklamaları:</label>
                {descriptions.map((desc, index) => (
                    <input
                        key={index}
                        type="text"
                        className="w-full border text-black p-2 rounded mb-2"
                        placeholder={`Açıklama ${index + 1}`}
                        value={desc}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    />
                ))}
                <div className="flex gap-4 mt-2">
                    <button
                        type="button"
                        onClick={handleAddDescription}
                        className="px-3 py-1 bg-blue-700 text-white rounded"
                    >
                        Ek Açıklama Ekle
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteDescription}
                        className="px-3 py-1 bg-red-700 text-white rounded"
                    >
                        Ek Açıklama Sil
                    </button>
                </div>
            </div>

            {/* Kaydet Butonu */}
            <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-6 py-2 rounded font-semibold"
            >
                Ürünü Kaydet
            </button>
        </div>
    );
}

export default function UrunEkle() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-yellow-500 flex items-center justify-center">Yükleniyor...</div>}>
            <UrunEkleContent />
        </Suspense>
    );
}