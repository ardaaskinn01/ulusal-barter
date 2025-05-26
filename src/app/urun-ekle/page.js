"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { supabase } from "../../../supabase";

// Türkçe karakterleri dönüştür
const sanitizeFileName = (text) => {
    return text
        .toLowerCase()
        .replace(/ç/g, "c")
        .replace(/ğ/g, "g")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ş/g, "s")
        .replace(/ü/g, "u")
        .replace(/[^a-z0-9_-]/g, "-"); // Boşluk ve diğer karakterleri tireye çevir
};

export default function UrunEkle() {
    const [productName, setProductName] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [extraImages, setExtraImages] = useState([]);
    const [descriptions, setDescriptions] = useState([""]);
    const router = useRouter();

    const handleAddDescription = () => {
        setDescriptions([...descriptions, ""]);
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
        if (!productName || !mainImage) {
            alert("Lütfen ürün ismi ve ana görsel ekleyin.");
            return;
        }

        const safeProductName = sanitizeFileName(productName); // 👈 Türkçe karakterleri dönüştür
        const productRef = doc(db, "products", productName); // Firestore için orijinal isim kullanılabilir

        try {
            const mainImageUrl = await uploadToSupabase(mainImage, `${safeProductName}/main.jpg`);

            const extraImageUrls = [];
            for (let i = 0; i < extraImages.length; i++) {
                const img = extraImages[i];
                const url = await uploadToSupabase(img, `${safeProductName}/extra_${i}.jpg`);
                extraImageUrls.push(url);
            }

            await setDoc(productRef, {
                isim: productName,
                anaGorselUrl: mainImageUrl,
                ekGorselUrl: extraImageUrls,
                aciklamalar: descriptions,
            });

            alert("Ürün başarıyla eklendi!");
            router.push("/dashboard");
        } catch (error) {
            console.error("Hata detayları:", error);
            alert("Ürün eklenirken bir hata oluştu: " + (error.message || error));
        }
    };

    return (
        <div className="min-h-screen bg-amber-500 p-6">
            <h1 className="text-3xl text-white font-bold mb-6">Ürün Ekle</h1>

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Ürün İsmi:</label>
                <input
                    type="text"
                    className="w-full text-black border p-2 rounded"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>

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

            <div className="mb-6">
                <label className="block mb-2 font-semibold">Ek Görseller:</label>
                <input type="file" accept="image/*" multiple onChange={handleExtraImageAdd} />
                <ul className="mt-2 list-disc list-inside">
                    {extraImages.map((img, i) => (
                        <li key={i}>{img.name}</li>
                    ))}
                </ul>
            </div>

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
                <button
                    type="button"
                    onClick={handleAddDescription}
                    className="mt-2 px-3 py-1 bg-blue-700 text-white rounded"
                >
                    Ek Açıklama Ekle
                </button>
            </div>

            <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-6 py-2 rounded font-semibold"
            >
                Ürünü Kaydet
            </button>
        </div>
    );
}
