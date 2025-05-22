"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Hakkinda() {
  return (
    <div className="relative min-h-screen bg-white text-gray-800 flex flex-col font-sans overflow-hidden">
      {/* Arka Plan Görseli (Sadece bu blur olacak) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background3.jpg"
          alt="background"
          fill
          className="object-cover blur-[4px]"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* İçerik (Blur olmayan kısım) */}
      <div className="relative z-20 flex-grow pt-32 px-6 md:px-20 lg:px-36 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Başlık */}
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-8 lg:mb-12 border-b-4 border-green-400 inline-block pb-2">
            Hakkında
          </h1>

          {/* Metin İçeriği */}
          <div className="space-y-6 text-base leading-8 text-white mt-4 md:mt-6 lg:mt-8">
            <p>
              Kuruluşumuzun temelleri, 1977 yılında kurucumuz Hasan Tutak tarafından kurulan teknik demir doğrama atölyesiyle atılmıştır. Ustalığı, çalışkanlığı ve vizyonuyla kısa sürede kendini geliştiren Hasan Tutak, zamanla PVC sektörüne yönelerek bölgesinde öncü bir isim haline gelmiş, Fıratpen iş ortaklığı ile üretim kapasitesini artırmış ve kendi PVC fabrikasını kurarak sektörde önemli bir dönüşüm gerçekleştirmiştir.
            </p>
            <p>
              1992 yılında şirketimiz, kurumsal kimliğini güçlendirmek ve büyüme stratejisini netleştirmek amacıyla Tutakoğulları Sanayi ve Ticaret Ltd. Şti. adıyla yeniden yapılandırılmış; Hasan Tutak ve Pakize Tutak ortaklığında sanayi ve ticaret alanlarında sağlam bir zemin oluşturulmuştur. Bu yapı içerisinde PVC ve cam üretimi başta olmak üzere birçok farklı sektörde hizmet verilmiştir.
            </p>
            <p>
              2000 yılı itibarıyla, ikinci kuşak temsilcimiz Nurettin Tutak liderliğinde önemli bir vizyon değişimi yaşanmış; şirket yalnızca PVC ve cam üretimiyle sınırlı kalmayıp inşaat, müteahhitlik, taşımacılık, otomotiv alım satımı, araç kiralama ve devlet ihaleleri gibi farklı alanlara da açılmıştır. Türkiye'nin 81 iline yayılan hizmet ağıyla büyük ölçekli projelere ve güçlü iş ortaklıklarına imza atılmıştır.
            </p>
            <p>
              Bu süreçte kurulan NRT Grup İnşaat A.Ş., tek ortaklı bir yapı olarak Nurettin Tutak öncülüğünde; kentsel dönüşüm projeleri, konut ve villa inşaatları üzerine uzmanlaşmıştır. Şu anda Aydın Nazilli'de hayata geçirilen 90 villalık proje, modern mimari anlayışı ve yüksek yapı kalitesi ile bölgeye değer katmaktadır. Aynı zamanda Kuşadası, Çeşme, Urla ve Çiğli gibi bölgelerde taşeronluk inşaat faaliyetleriyle aktif olarak yer almaktadır.
            </p>
            <p>
              Genişleyen faaliyet alanlarımız doğrultusunda şirketimiz, taşımacılık ve araç kiralama hizmetlerini de başarıyla sürdürmektedir. Almanya, Kıbrıs, Bodrum ve İzmir merkezli organizasyonumuzla, makam araçları da dahil olmak üzere toplam 950 araçlık filomuz, bireysel ve kurumsal müşterilere güvenli ve konforlu çözümler sunmaktadır.
            </p>
            <p>
              Ayrıca, mimarlık, teknik çizim, harita mühendisliği ve proje geliştirme alanlarında da faaliyet göstererek sadece uygulamada değil, tasarım aşamasında da yüksek standartlarda hizmet veriyoruz.
            </p>
          </div>

          {/* Kartlar */}
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            {/* Misyon */}
            <div className="bg-gray-800/80 p-8 rounded-3xl shadow-lg border-t-4 border-green-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Misyonumuz ve Değerlerimiz</h2>
              <p className="text-base text-white leading-7">
                55 yılı aşkın süredir babadan oğula aktarılan bu meslek yalnızca bir iş değil; güvenin, emeğin ve aile değerlerinin ortak adıdır. Tutakoğulları ve NRT Grup İnşaat olarak biz, kaliteye, güvene ve müşteri memnuniyetine dayalı bir anlayışla çalışıyor; bulunduğumuz her sektörde örnek gösterilen projelere imza atmaya devam ediyoruz.
              </p>
            </div>

            {/* Vizyon */}
            <div className="bg-gray-800/80 p-8 rounded-3xl shadow-lg border-t-4 border-green-500 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Geleceğe Yönelik Vizyonumuz</h2>
              <p className="text-base text-white leading-7">
                NRT Grup A.Ş. olarak geçmişten aldığımız güçle geleceğe emin adımlarla ilerliyoruz. 2025 yılı hedeflerimiz arasında, Kütahya Gediz Organize Sanayi Bölgesi'nde kurulacak olan yeni üretim tesisimizle üretim alanımızı 50.000 m²'ye çıkarmak ve bisiklet/otomobil parçaları üretiminde yurt dışı yatırımlarla büyümek yer almaktadır.
              </p>
            </div>
          </div>

          {/* Slogan */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Geçmişten aldığımız güçle geleceği inşa ediyoruz.
            </h2>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              Yönetim Kurulu
            </h2>
          </div>

          {/* Profil Kartları */}
          <div className="mt-6 grid md:grid-cols-2 gap-12">
            {/* Nurettin */}
            <div className="text-center bg-gray-800/80 p-6 rounded-2xl border border-gray-700 shadow-sm backdrop-blur-sm">
              <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-300">
                <Image
                  src="/hasan.png"
                  alt=""
                  width={100}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">Hasan Tutak</h3>
            </div>

            {/* Hasan */}
            <div className="text-center bg-gray-800/80 p-6 rounded-2xl border border-gray-700 shadow-sm backdrop-blur-sm">
              <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-300">
                <Image
                  src="/nurettin.png"
                  alt=""
                  width={100}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">Nurettin Tutak</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}