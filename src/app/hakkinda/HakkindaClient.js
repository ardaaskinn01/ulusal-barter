"use client";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useLanguage } from '../LanguageContext.js';
import { useHakkindaState } from "./useHakkindaState";



export default function Hakkinda() {
    const { translate } = useLanguage();
    const { activeSection, setActiveSection } = useHakkindaState();
    const sections = [
    { id: "genel", title: translate("about35") },
    { id: "misyon", title: translate("about36") },
    { id: "vizyon", title: translate("about37") },
    { id: "yonetim", title: translate("about29") },
];

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
                        {translate('aboutUs')}
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
                            <h3 className="text-xl font-extrabold text-white">{translate('about30')}</h3>
                            <p>
                                {translate('about1')}
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">{translate('about31')}</h3>
                            <p>
                                {translate('about2')}
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">{translate('about32')}</h3>
                            <p>
                                {translate('about3')}
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">{translate('about33')}</h3>
                            <p>
                                {translate('about4')}
                            </p>

                            <h3 className="text-xl font-extrabold text-white mt-10">{translate('about34')}</h3>
                            <p>
                                {translate('about5')}
                            </p>
                            <p>{translate('about5')}</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    {translate('about6')}
                                </li>
                                <li>
                                    {translate('about7')}
                                </li>
                                <li>
                                    {translate('about8')}
                                </li>
                                <li>
                                    {translate('about9')}
                                </li>
                                <li>
                                    {translate('about10')}
                                </li>
                                <li>
                                    {translate('about11')}
                                </li>
                                <li>
                                    {translate('about12')}
                                </li>
                                <li>
                                    {translate('about13')}
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeSection === "misyon" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{translate('about14')}</h2>
                            <p>
                                {translate('about15')}
                            </p>
                        </div>
                    )}

                    {activeSection === "vizyon" && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{translate('about16')}</h2>
                            <p>
                                {translate('about17')}
                            </p>
                        </div>
                    )}

                    {activeSection === "yonetim" && (
                        <div className="max-w-7xl mx-auto text-center">
                            <h2 className="text-3xl text-white font-bold tracking-wide mb-12">
                                {translate('about29')}
                            </h2>

                            {/* Başkan */}
                            <div className="flex justify-center mb-12">
                                <div className="bg-white/80 text-gray-900 p-6 rounded-2xl shadow-lg w-72">
                                    <h3 className="text-lg text-yellow-600 font-semibold mb-1">Özkan ŞİMŞEK</h3>
                                    <p className="text-sm">{translate('about18')}</p>
                                </div>
                            </div>

                            {/* Başkan Vekili ve Üye */}
                            <div className="flex flex-wrap justify-center gap-6 mb-12">
                                {[
                                    { title: translate('about19'), name: 'Hasan ULAŞZADE' },
                                    { title: translate('about20'), name: 'Selim ANIŞ' },
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
                                    { title: translate('about21'), name: 'Cengiz ŞİMŞEK' },
                                    { title: translate('about22'), name: 'Hüseyin ULAŞZADE' },
                                    { title: translate('about23'), name: 'Burak KOÇAK' },
                                    { title: translate('about24'), name: 'Mehmet KARABAĞ' },
                                    { title: translate('about24'), name: 'Hüseyin GÜRER' },
                                    { title: translate('about25'), name: 'Beyza Nur KOŞAR' },
                                    { title: translate('about26'), name: 'Kerim ÇAKMAK' },
                                    { title: translate('about27'), name: 'Yunus GÖREL' },
                                    { title: translate('about27'), name: 'İbrahim KAHRAMAN' },
                                    { title: translate('about28'), name: 'Büşra KOLUKISA' },
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