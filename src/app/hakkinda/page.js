"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Head from "next/head";

export default function Hakkinda() {
  return (
    <>
      <Head>
        <title>Hakkımızda | ULUSAL BARTER A.Ş. - Türkiye&apos;nin Lider Barter Platformu</title>
        <meta name="description" content="Ulusal Barter A.Ş. hakkında detaylı bilgi. 17 yıllık deneyimimizle Türkiye&apos;nin en güvenilir barter platformuyuz. Misyonumuz ve vizyonumuz hakkında bilgi alın." />
        <meta property="og:title" content="Hakkımızda | ULUSAL BARTER A.Ş." />
        <meta property="og:description" content="17 yıllık deneyimle Türkiye&apos;nin lider barter platformu" />
        <meta property="og:image" content="https://ulusalbarter.com/bg29.jpg" />
      </Head>
      <div className="relative min-h-screen bg-white text-gray-800 flex flex-col font-sans overflow-hidden">
        {/* Arka Plan Görseli (Yönetim Kurulu kısmına kadar) */}
        <div className="absolute inset-0 z-0">
          <div className="min-h-screen h-full relative">
            <Image
              src="/bg29.jpg"
              alt="background"
              fill
              className="object-cover blur-[4px]"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-65"></div>
          </div>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* İçerik */}
        <div className="relative z-20 flex-grow pt-32 px-6 md:px-20 lg:px-36 text-white">
          <div className="max-w-7xl mx-auto">
            {/* Başlık */}
            <h1 className="text-4xl font-bold text-white mb-4 md:mb-8 lg:mb-12 border-b-4 border-yellow-600 inline-block pb-2">
              Hakkımızda
            </h1>

            {/* Metin İçeriği */}
            <div className="space-y-6 text-base leading-8 text-white mt-4 md:mt-6 lg:mt-8">
              <p>
                ULUSAL Barter A.Ş. dünyada yaygın olarak kullanılan barter sisteminin, ülkemizin ticari faaliyetlerine yeni bir soluk getirmesi amacıyla kurulmuştur.
              </p>
              <p>
                Güçlü sermaye ve akılcı ticaret anlayışıyla, ekonomiğe katkısıyla kurumsal yapısının yanı sıra, profesyonel ekibi ile işini sahiplenen, sorunları çözme konusunda yaratıcılığını kullanan, akılcı çözümler üreten, ULUSAL Barter A.Ş. gelişmekte olan sektörün en güçlü temsilcisidir.
              </p>
              <p>
                Her yıl başarısını katlayarak arttıran ULUSAL Barter A.Ş. ülkenin önde gelen büyük holdingleri ile birçok ortak projede yer almış; hizmet politikası ile yer almış olduğu işlerden olumlu referanslar almıştır. Kazandığı olumlu referansların gücü ile portföyünü zenginleştiren ULUSAL Barter A.Ş.
                5000 aşkın üye sayısına ulaşmıştır.
              </p>
              <p>
                Gün geçtikçe artmaya devam eden üye sayısının ve stratejik ortaklarının desteğiyle elde ettiği başarıları, ülkemizde gelişmekte olan barter sektörünün, yenilikçi, vizyoner ve kazançlı bir ticaret sistemi olarak tanınmasına katkıda bulunmaktadır.
              </p>
              <p>
                Katma değerli dış Ticaret projeleri geliştirirken;
              </p>
              <p>
                ✓ ULUSAL Barter A.Ş.
                misyon, vizyon ve stratejisi ile hareket ederek, Ram iç ve Dış Ticaret olarak her türlü dışve iç
                ticaret operasyonunu ilgili tarafların ihtiyaç ve beklentilerini karşılayarak yapmayı,
              </p>
              <p>
                ✓ Müşteri odaklı stratejisi ile en iyi hizmeti ve kusursuz hizmet sunmayı hedeflerken; iş ahlakı ve
                güvenilir duruşundan ödün vermemeyi,
              </p>
              <p>
                ✓ 26 yıllık dış ve iç ticaret sektör tecrübesi, bilgi birikimi ve uzman ekibi ile sektöre öncü olmayı
                ve sektör standartları belirleyecek adımlar atarak gelişmeyi,
              </p>
              <p>
                ✓ Ülke ekonomisine katkı sağlayacak ihracat faaliyetlerinde, kurumlara sağlayacağı finansal
                hizmetler ile en verimli ve optimum çözümler sunmayı,
              </p>
              <p>
                ✓ Kusursuz hizmet misyonunu ile çalışanlarını ve etkileşim içinde olduğu ilgili taraflarını da kalite
                yolculuğunda birlikte yanında taşımayı ve sürekli geliştirmeyi,
              </p>
              <p>
                ✓ Ulusal ve/veya uluslararası mevzuatlara uyum yükümlülüklerini yerine getirirken; çevreci
                yaklaşımlar ve sosyal sorumluluk projelerine de imza atarak ilgili tarafları ve çalışanlarının bilinç
                seviyesini artırmayı,
              </p>
              <p>
                ✓ Teknolojik gelişmeleri takip ederek, inovatif yaklaşımlar ile operasyon ve hizmet kalitesini sürekli
                dijitalleştirmeyi,
              </p>
              <p>
                ✓ Zor olanı başarmak ve hedeflerine ulaşmak için tüm bu faaliyetleri yürütürken bilgi birikimi ve
                sektör deneyimlerini kalite yönetim sistemi ile kurumsal hafızaya alarak, gelecek nesillere
                aktarmayı ve sistemi sürekli geliştirerek sürdürmeyi taahhüt eder.
              </p>
            </div>

            {/* Kartlar */}
            <div className="mt-16 grid md:grid-cols-2 gap-12">
              {/* Misyon */}
              <div className="bg-gray-800/80 p-8 rounded-3xl shadow-lg border-t-4 border-yellow-600 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Misyonumuz ve Değerlerimiz</h2>
                <p className="text-base text-white leading-7">
                  Ülkemizin ticaret ve yatırımlar açısından çekim merkezi ve yaşam kalitesini sürekli artıran bir ülke haline getirmek, kaynakları etkin bir şekilde kullanarak geliştirdiği yenilikçi ve özgün projeler ile üyelerinin ticari faaliyetlerini kolaylaştırmak, iş dünyası ve topluma sürdürülebilir hizmetler sunmak.
                </p>
              </div>

              {/* Vizyon */}
              <div className="bg-gray-800/80 p-8 rounded-3xl shadow-lg border-t-4 border-yellow-600 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Geleceğe Yönelik Vizyonumuz</h2>
                <p className="text-base text-white leading-7">
                  Sürdürülebilir kalkınma amaçları doğrultusunda üyelerinin sektörel gelişim ve dönüşüm süreçlerine rehberlik eden, paydaşlarıyla birlikte değer yaratan, yaşam, ticaret ve yatırımda ülkemizin rol model Barter şirketi olmak.
                </p>
              </div>
            </div>


            {/* Slogan */}
            <div className="mt-24 text-center">
              <h2 className="text-3xl font-bold text-yellow-600 tracking-wide">

              </h2>
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-gradient-to-b from-yellow-600 to-yellow-500 text-gray-900 py-24 px-6 md:px-20 lg:px-36">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl text-white font-bold tracking-wide mb-12">
              YÖNETİM KURULU
            </h2>

            {/* Başkan */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 text-gray-900 p-6 rounded-2xl shadow-lg w-72">
                <h3 className="text-lg text-yellow-800 font-semibold mb-1">Özkan ŞİMŞEK</h3>
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
                  <h3 className="text-lg text-yellow-800 font-semibold mb-1">{member.name}</h3>
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
                  <h3 className="text-lg text-yellow-800 font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}