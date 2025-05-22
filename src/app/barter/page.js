"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Barter() {
    return (
        <div className="min-h-screen bg-white relative flex flex-col">
            <Navbar />

            {/* Arka plan */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg12.jpg"
                    alt="background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
            </div>

            {/* İçerik */}
            <div className="flex-grow px-4 sm:px-8 py-12 relative z-10">
                <div className="max-w-5xl mx-auto mt-20">

                    <div className="space-y-10">

                        {/* Barter Nedir? */}
                        <Section
                            title="Barter Nedir?"
                            content="Barter, modern ticaret dünyasında nakit kullanımına alternatif olarak geliştirilen, firmaların ürün ve hizmetlerini organize bir sistem içerisinde karşılıklı değer değişimi yoluyla değerlendirmesini sağlayan bir finansal modeldir.

Ulusal Barter Finans A.Ş. olarak biz, barter sistemini sadece bir takas yöntemi olarak değil; firmaların nakit akışlarını rahatlatan, stoklarını eriten, satış hacmini artıran ve yeni iş bağlantıları yaratan güçlü bir ticaret ağı olarak sunuyoruz.

Barter, aynı anda hem alım hem de satım yapmayı mümkün kılan kapalı bir döngü değil, açık ve esnek bir finansal ekosistemdir. Şirketler sistemimize dahil olarak ihtiyaç duydukları ürün veya hizmeti nakit kullanmadan temin ederken, aynı zamanda kendi sundukları değerle sisteme katkı sağlarlar."
                        />

                        {/* Barter Avantajları */}
<Section
  title="Barter Avantajları"
  content={`💼 1. Nakit Sıkışıklığına Alternatif
Nakit çıkışı olmadan alım yapılabilir. Bu sayede likidite sorunu yaşamadan iş süreçlerinizi sürdürebilirsiniz.

📦 2. Stoklarınız Değer Kazanır
Depoda bekleyen ürünler, sistem içinde işlem görerek sizi yeni müşterilerle buluşturur ve kazanca dönüşür.

🤝 3. Yeni Pazarlara Açılırsınız
Barter ağına katılan firmalar, sistem içerisindeki farklı sektörlerden firmalarla doğal işbirlikleri geliştirir.

📈 4. Satış Hacmi Genişler
Ürün ya da hizmetiniz, normal pazarın dışında daha fazla kullanıcıya ulaşarak görünürlüğünüzü artırır.

🔄 5. Çift Taraflı Kazanç
Barter, hem alıcı hem satıcı pozisyonunda olabileceğiniz bir sistemdir. Bu çift yönlü yapı, ticari esneklik sağlar.

🛡️ 6. Ekonomik Dalgalanmalara Karşı Dayanıklılık
Piyasalardaki belirsizlik ve kriz ortamlarında barter sistemi, firmaların operasyonel gücünü korumasına yardımcı olur.`}
/>


                        <Section
                            title="Neden Ulusal Barter Finans A.Ş.?"
                            content="Çünkü biz sadece bir ticaret platformu değiliz; değerin döndüğü, işletmelerin kazandığı sürdürülebilir bir sistem inşa ediyoruz.

Ulusal ölçekte kurduğumuz geniş barter ağı ve güvenilir işlem yapısı sayesinde, firmalarımıza nakitsiz büyüme imkânı sunuyoruz.

Ulusal Barter Finans A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli."
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

// İçerik Bölümü Bileşeni
function Section({ title, content }) {

    return (
        <div className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-md border-l-4 border-yellow-400">
            <h2 className="text-2xl font-semibold text-[#1abc9c] mb-3">{title}</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{content}</p>
        </div>
    );
}
