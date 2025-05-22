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
                    src="/background4.jpg"
                    alt="background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
            </div>

            {/* İçerik */}
            <div className="flex-grow px-4 sm:px-8 py-12 relative z-10">
                <div className="max-w-5xl mx-auto">

                    <div className="space-y-10">

                        {/* Barter Nedir? */}
                        <Section
                            title="Barter Nedir?"
                            content="Barter, para yerine mal veya hizmetlerin doğrudan değiş tokuş edilmesi demektir. Bu yöntemde, sahip olduğunuz bir mal veya hizmeti başka biriyle değiştirirsiniz. Örneğin, bahçenizde yetiştirdiğiniz domatesleri komşunuzun taze yumurtalarına takas edebilirsiniz. Böylece her iki taraf da paraya ihtiyaç duymadan istediği şeye kavuşur. Bu takas sistemi, paranın olmadığı ya da yeterli olmadığı zamanlardan beri kullanılan bir yöntemdir. Günümüzde de bazı takas grupları ve internet siteleri sayesinde uygulanmaya devam etmektedir."
                        />

                        {/* Barter Avantajları */}
                        <Section
                            title="Barter Avantajları"
                            content="Barter, parası az olanlar için avantajlıdır: sahip olduğunuz eşyalar veya hizmetlerle ihtiyaçlarınızı karşılayabilirsiniz. Böylece nakit para yerine boşa duran eşyalarınız değer kazanır ve israf önlenir. Bu sayede hem paranız cebinizde kalır hem de kullanılmayan eşyalar değerlendirilmiş olur. Ayrıca barter sayesinde komşular ve arkadaşlar arasında yardımlaşma artar, yeni insanlarla tanışır ve güvene dayalı ilişkiler kurarsınız. Dayanışma artarken bütçeniz de rahatlar. Kısacası barter, ihtiyaç duyduğunuz şeylere para yerine takas yoluyla ulaşmanızı sağlar. Diğer bir deyişle barter, az maliyetle çok iş görmenizi ve yardımlaşmayı teşvik etmenizi sağlar."
                        />

                        {/* Barter Örnekleri */}
                        <Section
                            title="Barter Örnekleri"
                            content="Örneğin, evinizdeki fazla meyveleri komşunuzun yumurtalarıyla takas edebilirsiniz. Berber bir arkadaşına ücretsiz saç kesimi yapar ve karşılığında arkadaşından ev temizliğinde yardım alabilir. Öğrenciler arasında ders takası da yaygındır: biri matematik dersi verir, karşılığında fizik dersi alır. Hatta bazı yerlerde giysi, kitap veya oyuncak takas etkinlikleri düzenlenir. Bu örnekler, barter sistemi sayesinde insanların ihtiyaçlarını nakit paraya ihtiyaç duymadan, sahip oldukları eşya veya hizmetlerle doğrudan karşılayabildiklerini gösterir."
                        />

                        {/* Karşılıksız Evrak */}
                        <Section
                            title="Karşılıksız Evrak"
                            content="Karşılıksız evrak, genellikle ödenmeyen veya banka tarafından karşılığı bulunmayan çek ya da senetleri ifade eder. Diyelim ki elinizde bir çek var, ama banka hesabınızda para olmadığı için banka bu çekinizi ödemedi; bu çek artık “karşılıksız” sayılır ve normalde değersiz hale gelir. Ancak barter sistemi içinde bu tür evraklar bile değerlendirilebilir. Bazı barter şirketleri, karşılıksız çek veya senedi belirli bir komisyon karşılığında alır ve çekin tutarı kadar bir değeri size barter hesabınıza ekler. Böylece değersiz görünen bu belgeyi barter ağı içinde alışveriş yapabileceğiniz bir değere dönüştürebilirsiniz."
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
