"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useHakkindaState } from "./useHakkindaState";

const sections = [
    { id: "genel", title: "Genel Bilgi" },
    { id: "misyon", title: "Misyonumuz" },
    { id: "vizyon", title: "Vizyonumuz" },
    { id: "yonetim", title: "Yönetim Kurulu" },
];

export default function Hakkinda() {
    const { activeSection, setActiveSection } = useHakkindaState();

    return (
        <div className="relative min-h-screen bg-white text-gray-800 flex flex-col font-sans overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/bg29.jpg"
                    alt="background"
                    fill
                    className="object-cover blur-[4px]"
                    priority
                />
                <div className="absolute inset-0 bg-black opacity-65"></div>
            </div>

            <Navbar />

            <div className="relative z-10 flex flex-col md:flex-row pt-40 px-6 md:px-20 lg:px-36 text-white mt-12">
                {/* Menü */}
                <div className="md:w-1/4 mb-12 md:mb-0">
                    <h1 className="text-3xl font-bold border-b-4 border-yellow-500 pb-2 mb-6">
                        Hakkımızda
                    </h1>
                    <ul className="space-y-4">
                        {sections.map((sec) => (
                            <li
                                key={sec.id}
                                onClick={() => setActiveSection(sec.id)}
                                className={`cursor-pointer hover:text-yellow-400 flex items-center justify-between ${activeSection === sec.id ? "text-yellow-400 font-bold" : ""
                                    }`}
                            >
                                <span>{sec.title}</span>
                                <span className="ml-2">
                                    {activeSection === sec.id ? "▼" : "›"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* İçerik */}
                <div className="md:w-3/4 md:pl-12">
                    {activeSection === "genel" && (
                        <div className="text-base leading-8 text-white">
                            <h3 className="text-xl font-extrabold text-white">Kuruluş Amacı</h3>
                            <p>
                                ULUSAL Barter A.Ş. dünyada yaygın olarak kullanılan barter sisteminin, ülkemizin ticari faaliyetlerine yeni bir soluk getirmesi amacıyla kurulmuştur.
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">Kurumsal Yapı ve Güçlü Kadro</h3>
                            <p>
                                Güçlü sermaye ve akılcı ticaret anlayışıyla, ekonomiğe katkısıyla kurumsal yapısının yanı sıra, profesyonel ekibi ile işini sahiplenen, sorunları çözme konusunda yaratıcılığını kullanan, akılcı çözümler üreten, ULUSAL Barter A.Ş. gelişmekte olan sektörün en güçlü temsilcisidir.
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">Başarı ve Referanslar</h3>
                            <p>
                                Her yıl başarısını katlayarak arttıran ULUSAL Barter A.Ş. ülkenin önde gelen büyük holdingleri ile birçok ortak projede yer almış; hizmet politikası ile yer almış olduğu işlerden olumlu referanslar almıştır. Kazandığı olumlu referansların gücü ile portföyünü zenginleştiren ULUSAL Barter A.Ş. 5000 aşkın üye sayısına ulaşmıştır.
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">Sektöre Katkı</h3>
                            <p>
                                Gün geçtikçe artmaya devam eden üye sayısının ve stratejik ortaklarının desteğiyle elde ettiği başarıları, ülkemizde gelişmekte olan barter sektörünün, yenilikçi, vizyoner ve kazançlı bir ticaret sistemi olarak tanınmasına katkıda bulunmaktadır.
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">Faaliyet İlkeleri ve Hedefler</h3>
                            <p>Katma değerli dış ticaret projeleri geliştirirken:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    ULUSAL Barter A.Ş. misyon, vizyon ve stratejisi ile hareket ederek, Ram İç ve Dış Ticaret olarak her türlü dış ve iç ticaret operasyonunu ilgili tarafların ihtiyaç ve beklentilerini karşılayarak yapmayı,
                                </li>
                                <li>
                                    Müşteri odaklı stratejisi ile en iyi hizmeti ve kusursuz hizmet sunmayı hedeflerken; iş ahlakı ve güvenilir duruşundan ödün vermemeyi,
                                </li>
                                <li>
                                    26 yıllık dış ve iç ticaret sektör tecrübesi, bilgi birikimi ve uzman ekibi ile sektöre öncü olmayı ve sektör standartları belirleyecek adımlar atarak gelişmeyi,
                                </li>
                                <li>
                                    Ülke ekonomisine katkı sağlayacak ihracat faaliyetlerinde, kurumlara sağlayacağı finansal hizmetler ile en verimli ve optimum çözümler sunmayı,
                                </li>
                                <li>
                                    Kusursuz hizmet misyonu ile çalışanlarını ve etkileşim içinde olduğu ilgili taraflarını da kalite yolculuğunda birlikte yanında taşımayı ve sürekli geliştirmeyi,
                                </li>
                                <li>
                                    Ulusal ve/veya uluslararası mevzuatlara uyum yükümlülüklerini yerine getirirken; çevreci yaklaşımlar ve sosyal sorumluluk projelerine de imza atarak ilgili tarafları ve çalışanlarının bilinç seviyesini artırmayı,
                                </li>
                                <li>
                                    Teknolojik gelişmeleri takip ederek, inovatif yaklaşımlar ile operasyon ve hizmet kalitesini sürekli dijitalleştirmeyi,
                                </li>
                                <li>
                                    Zor olanı başarmak ve hedeflerine ulaşmak için tüm bu faaliyetleri yürütürken bilgi birikimi ve sektör deneyimlerini kalite yönetim sistemi ile kurumsal hafızaya alarak, gelecek nesillere aktarmayı ve sistemi sürekli geliştirerek sürdürmeyi taahhüt eder.
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeSection === "misyon" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
                            <p>
                                Ülkemizin ticaret ve yatırımlar açısından çekim merkezi ve yaşam kalitesini sürekli artıran bir ülke haline getirmek, kaynakları etkin bir şekilde kullanarak geliştirdiği yenilikçi ve özgün projeler ile üyelerinin ticari faaliyetlerini kolaylaştırmak, iş dünyası ve topluma sürdürülebilir hizmetler sunmak.
                                Aynı zamanda, yerel ve küresel pazarlarda rekabet gücünü artırmak adına üyelerimize stratejik destek sağlamak en önemli hedeflerimizdendir.
                                Dijitalleşen dünyada değişime hızlı uyum sağlayarak teknolojiyi en etkin biçimde kullanmak için çalışmalar yürütüyoruz.
                                Tüm faaliyetlerimizde etik değerlere bağlı kalmayı, şeffaflık ve güvenilirliği ilke ediniyoruz.
                            </p>
                        </div>
                    )}

                    {activeSection === "vizyon" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
                            <p>
                                Sürdürülebilir kalkınma amaçları doğrultusunda üyelerinin sektörel gelişim ve dönüşüm süreçlerine rehberlik eden, paydaşlarıyla birlikte değer yaratan, yaşam, ticaret ve yatırımda ülkemizin rol model Barter şirketi olmak.
                                İnovasyonu ve sürekli gelişimi temel alarak, iş dünyasının ihtiyaçlarına kalıcı çözümler üretmeyi hedefliyoruz.
                                Uluslararası standartlarda hizmet sunarak küresel ölçekte tanınan ve tercih edilen bir kuruluş olmayı amaçlıyoruz.
                                Toplumun refah seviyesini artırmaya katkı sağlayacak projelerle sosyal sorumluluğu da ön planda tutuyoruz.
                            </p>
                        </div>
                    )}

                    {activeSection === "yonetim" && (
                        <div className="max-w-7xl mx-auto text-center">
                            <h2 className="text-3xl text-white font-bold tracking-wide mb-12">
                                YÖNETİM KURULU
                            </h2>

                            {/* Başkan */}
                            <div className="flex justify-center mb-12">
                                <div className="bg-white/80 text-gray-900 p-6 rounded-2xl shadow-lg w-72">
                                    <h3 className="text-lg text-yellow-600 font-semibold mb-1">Özkan ŞİMŞEK</h3>
                                    <p className="text-sm">Yönetim Kurulu Başkanı</p>
                                </div>
                            </div>

                            {/* Başkan Vekili ve Üye */}
                            <div className="flex flex-wrap justify-center gap-6 mb-12">
                                {[
                                    { title: 'Yönetim Kurulu Başkan Vekili', name: 'Hasan ULAŞZADE' },
                                    { title: 'Yönetim Kurulu Üyesi', name: 'Selim ANIŞ' },
                                ].map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/80 text-gray-900 p-6 rounded-2xl shadow-lg w-72"
                                    >
                                        <h3 className="text-lg text-yellow-600 font-semibold mb-1">{member.name}</h3>
                                        <p className="text-sm">{member.title}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Koordinatörler */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {[
                                    { title: 'Pazarlama Koordinatörü', name: 'Cengiz ŞİMŞEK' },
                                    { title: 'Medya Tanıtım Koordinatörü', name: 'Hüseyin ULAŞZADE' },
                                    { title: 'Bilgi İşlem Koordinatörü', name: 'Burak KOÇAK' },
                                    { title: 'Müşteri Koordinatörü', name: 'Mehmet KARABAĞ' },
                                    { title: 'Müşteri Koordinatörü', name: 'Hüseyin GÜRER' },
                                    { title: 'Hukuk Koordinatörü', name: 'Beyza Nur KOŞAR' },
                                    { title: 'Muhasebe Koordinatörü', name: 'Kerim ÇAKMAK' },
                                    { title: 'Emlak Koordinatörü', name: 'Yunus GÖREL' },
                                    { title: 'Emlak Koordinatörü', name: 'İbrahim KAHRAMAN' },
                                    { title: 'Müşteri Temsilcisi', name: 'Büşra KOLUKISA' },
                                ].map((member, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/80 text-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                                    >
                                        <h3 className="text-lg text-yellow-600 font-semibold mb-1">{member.name}</h3>
                                        <p className="text-sm">{member.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}