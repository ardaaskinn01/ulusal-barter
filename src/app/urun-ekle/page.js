"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../../supabase";
import { useLanguage } from '../LanguageContext';

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
    const { translate } = useLanguage();
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [mainImage, setMainImage] = useState(null);
    const [mainImageUrl, setMainImageUrl] = useState("");
    const [extraImages, setExtraImages] = useState([]);
    const [extraImageUrls, setExtraImageUrls] = useState([]);
    const [descriptions, setDescriptions] = useState([""]);
    const [createdAt, setCreatedAt] = useState(null);
    const [productId, setProductId] = useState(null);
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const router = useRouter();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Kullanıcı giriş yapmış, devam et
                setUser(user);
            } else {
                // Giriş yapılmamış, yönlendir
                router.push("/uyelik");
            }
        });

        return () => unsubscribe();
    }, []);

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
                setCreatedAt(data.createdAt || null);
                setProductId(data.id || null);
            } else {
                alert(translate("productNotFound")); // "Düzenlenecek ürün bulunamadı."
            }
        } catch (err) {
            console.error(translate("productFetchError"), err); // "Ürün getirilirken hata"
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

    function generateIdFromDate(timestamp) {
        const date = timestamp.toDate(); // Firestore Timestamp nesnesini JS Date'e çevir
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay 0-indexed
        const year = String(date.getFullYear()).slice(2); // Son iki hane
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');

        return `${day}${month}${year}${hour}${minute}`;
    }

    const handleSubmit = async () => {
        if (!productName || !price || (!mainImage && !mainImageUrl)) {
    alert(translate("fillRequiredFields"));
    return;
}

if (!user) {
    alert(translate("userNotFound"));
    return;
}

        const now = new Date();
        const fakeTimestamp = { toDate: () => now };
        const newProductId = generateIdFromDate(fakeTimestamp);

        // Eğer productId varsa (düzenleme modundan veya başka yerden) kullan, yoksa yeni oluşturulanı kullan
        const finalProductId = productId || newProductId;

        // Burada productRef'i finalProductId ile oluşturuyoruz
        const productRef = doc(db, "products", productName);

        try {
            let uploadedMainImageUrl = mainImageUrl;

            if (mainImage) {
                const mainExt = getExtensionByType(mainImage.type);
                uploadedMainImageUrl = await uploadToSupabase(mainImage, `${sanitizeFileName(productName)}/main.${mainExt}`);
            }

            const uploadedExtraImageUrls = [...extraImageUrls];

            for (let i = 0; i < extraImages.length; i++) {
                const file = extraImages[i];
                const ext = getExtensionByType(file.type);
                const url = await uploadToSupabase(file, `${sanitizeFileName(productName)}/extra_${uploadedExtraImageUrls.length + i}.${ext}`);
                uploadedExtraImageUrls.push(url);
            }

            await setDoc(productRef, {
                id: finalProductId,       // Bu alana productId ya da yeni id geliyor
                isim: productName,
                fiyat: price,
                anaGorselUrl: uploadedMainImageUrl,
                ekGorselUrl: uploadedExtraImageUrls,
                aciklamalar: descriptions,
                userId: user.uid,
                sabitle: false,
                createdAt: createdAt || serverTimestamp(),
            });

            if (!editId) {
                await fetch("https://onesignal.com/api/v1/notifications", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic os_v2_app_2t2dfswqzrgrhbz5wjfudxswtgoodtrsmpbe4znf3nnrmncrg5triwmlmxgbl7ewjhvumikoguv5mvjy5g2n6frlrdtylklan3hnlji",
                    },
                    body: JSON.stringify({
                        app_id: "d4f432ca-d0cc-4d13-873d-b24b41de5699",
                        included_segments: ["All"],
                        headings: { en: "Yeni Ürün!" },
                        contents: { en: `${productName} adlı ürün eklendi!` },
                        url: `https://ulusalbarter.com/urun/${productName}`,
                    }),
                });
            }

           alert(translate("productSaved"));
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
        if (type.includes("video/quicktime")) return "mov"; // iPhone’dan gelen videolar
        return ""; // bilinmeyen tür
    }

    return (
        <div className="min-h-screen bg-yellow-500 p-6">
            <h1 className="text-3xl text-white font-bold mb-6">{translate("addProduct")}</h1>

            {/* Ürün İsmi */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">{translate("productName")}:</label>
                <input
                    type="text"
                    className="w-full text-black border p-2 rounded"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
            </div>

            {/* Fiyat Bilgisi */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">{translate("price")}:</label>
                <input
                    type="text"
                    className="w-full text-black border p-2 rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={translate("price")}
                />
            </div>

            {/* Ana Görsel */}
            <div className="mb-4">
                <label className="block mb-2 font-semibold">{translate("selectMainImage")}:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setMainImage(e.target.files ? e.target.files[0] : null)}
                />
                {mainImage && <p className="mt-2">Seçilen: {mainImage.name}</p>}
            </div>

            {/* Ek Görseller */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold">{translate("addExtraImages")}:</label>
                <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleExtraImageAdd}
                />
                <ul className="mt-2 list-disc list-inside">
                    {extraImages.map((img, i) => (
                        <li key={i}>
                            {img.name} –{" "}
                            {img.type.startsWith("image/")
                                ? translate("image")
                                : img.type.startsWith("video/")
                                    ? translate("addVideo")
                                    : "Other"}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Açıklamalar */}
            <div className="mb-6">
                <label className="block mb-2 font-semibold">{translate("addDesc")}:</label>
                {descriptions.map((desc, index) => (
                    <input
                        key={index}
                        type="text"
                        className="w-full border text-black p-2 rounded mb-2"
                        placeholder={`${translate("addDesc")} ${index + 1}`}
                        value={desc}
                        onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    />
                ))}
                <div className="flex gap-4 mt-2">
                    <button
                        type="button"
                        onClick={handleAddDescription}
                        className="px-3 py-1 bg-white text-black rounded"
                    >
                        {translate("addDesc")}
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteDescription}
                        className="px-3 py-1 bg-black text-white rounded"
                    >
                        {translate("removeDesc")}
                    </button>
                </div>
            </div>

            {/* Kaydet Butonu */}
            <button
                onClick={handleSubmit}
                className="bg-green-700 text-white px-6 py-2 rounded font-semibold"
            >
                {translate("saveProduct")}
            </button>
        </div>
    );
}

export default function UrunEkle() {
    const { translate } = useLanguage();
    return (
        <Suspense fallback={<div className="min-h-screen bg-yellow-500 flex items-center justify-center">{translate("loginLoading")}</div>}>
            <UrunEkleContent />
        </Suspense>
    );
}