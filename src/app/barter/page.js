"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Barter() {
    return (
        <div className="min-h-screen bg-white relative flex flex-col">
            <Navbar />

            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg24.jpg"
                    alt="background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Siyah karartma overlay */}
                <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
            </div>

            {/* İçerik */}
            <div className="flex-grow px-6 sm:px-12 py-16 relative z-10">
                <div className="max-w-6xl mx-auto mt-24 space-y-16">

                    <div className="space-y-10">
                        <Section
                            title="Barter Nedir?"
                            content={`Barter, modern ticaret dünyasında nakit kullanımına alternatif olarak geliştirilen, firmaların ürün ve hizmetlerini organize bir sistem içerisinde karşılıklı değer değişimi yoluyla değerlendirmesini sağlayan bir finansal modeldir.

Ulusal Barter Finans A.Ş. olarak biz, barter sistemini sadece bir takas yöntemi olarak değil; firmaların nakit akışlarını rahatlatan, stoklarını eriten, satış hacmini artıran ve yeni iş bağlantıları yaratan güçlü bir ticaret ağı olarak sunuyoruz.

Barter, aynı anda hem alım hem de satım yapmayı mümkün kılan kapalı bir döngü değil, açık ve esnek bir finansal ekosistemdir. Şirketler sistemimize dahil olarak ihtiyaç duydukları ürün veya hizmeti nakit kullanmadan temin ederken, aynı zamanda kendi sundukları değerle sisteme katkı sağlarlar.`}
                        />

                        <Section
                            title="Barter Avantajları"
                            content={`1. Nakit Sıkışıklığına Alternatif
Nakit çıkışı olmadan alım yapılabilir. Bu sayede likidite sorunu yaşamadan iş süreçlerinizi sürdürebilirsiniz.

2. Stoklarınız Değer Kazanır
Depoda bekleyen ürünler, sistem içinde işlem görerek sizi yeni müşterilerle buluşturur ve kazanca dönüşür.

3. Yeni Pazarlara Açılırsınız
Barter ağına katılan firmalar, sistem içerisindeki farklı sektörlerden firmalarla doğal işbirlikleri geliştirir.

4. Satış Hacmi Genişler
Ürün ya da hizmetiniz, normal pazarın dışında daha fazla kullanıcıya ulaşarak görünürlüğünüzü artırır.

5. Çift Taraflı Kazanç
Barter, hem alıcı hem satıcı pozisyonunda olabileceğiniz bir sistemdir. Bu çift yönlü yapı, ticari esneklik sağlar.

6. Ekonomik Dalgalanmalara Karşı Dayanıklılık
Piyasalardaki belirsizlik ve kriz ortamlarında barter sistemi, firmaların operasyonel gücünü korumasına yardımcı olur.`}
                        />

                        <Section
                            title="Neden Ulusal Barter Finans A.Ş.?"
                            content={`Çünkü biz sadece bir ticaret platformu değiliz; değerin döndüğü, işletmelerin kazandığı sürdürülebilir bir sistem inşa ediyoruz.

Ulusal ölçekte kurduğumuz geniş barter ağı ve güvenilir işlem yapısı sayesinde, firmalarımıza nakitsiz büyüme imkânı sunuyoruz.

Ulusal Barter Finans A.Ş. — Paradan bağımsız, değerden yana bir ekonomi modeli.`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, content }) {
    return (
        <section className="relative p-0 sm:p-0">
            {/* Saydam beyaz arka plan + blur */}
            <div className="backdrop-blur-sm bg-white/10 p-6 sm:p-10 rounded-xl border border-white/20">
                <h2 className="text-3xl font-semibold text-yellow-600 mb-5 relative inline-block">
                    {title}
                    {/* Alt çizgi efekti */}
                    <span className="absolute left-0 -bottom-1 h-1 w-24 bg-yellow-600 rounded-full opacity-80"></span>
                </h2>
                <p className="text-white leading-relaxed whitespace-pre-line text-lg tracking-wide">
                    {content}
                </p>
            </div>
        </section>
    );
}
