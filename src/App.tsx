import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { createContext, useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import { GlobalContextInterface } from "./typings";
import { Language, Theme } from "./typings/enums";
import ArticleCard from "./Components/ArticleCard/ArticleCard";

export const GlobalContext = createContext<GlobalContextInterface>(
    {} as GlobalContextInterface
);

function App() {
    const [language, setLanguage] = useState<Language>();
    const [theme, setTheme] = useState<Theme>();

    const getTheme = () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === Theme.light || currentTheme === Theme.dark) {
            setTheme(currentTheme);
            if (currentTheme === Theme.dark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        } else {
            setTheme(Theme.light);
            localStorage.setItem("theme", Theme.light);
        }
    };

    const getLanguage = () => {
        const currentLanguage = localStorage.getItem("language");
        if (
            currentLanguage === Language.pl ||
            currentLanguage === Language.ua
        ) {
            setLanguage(currentLanguage);
        } else {
            setLanguage(Language.pl);
            localStorage.setItem("language", Language.pl);
        }
    };

    useEffect(() => {
        getTheme();
        getLanguage();
    }, []);

    if (!theme || !language) {
        return <Loading />;
    }

    return (
        <div className="flex-1 w-full flex flex-col">
            <GlobalContext.Provider
                value={{ theme, setTheme, language, setLanguage }}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<></>} />
                    <Route path="/articles" element={<></>} />
                    <Route path="/articles/:articleId" element={<></>} />
                    <Route path="/about" element={<></>} />
                    <Route path="/contact" element={<></>} />
                    <Route path="*" element={<>404</>} />
                </Routes>
            </GlobalContext.Provider>
            <div className="rounded-3xl bg-cover bg-center bg-no-repeat text-white mt-9 h-[50vh] flex items-center p-8" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(/src/assets/index-bg.jpg)" }}>
                <p className=" text-5xl max-w-[50vw]">Izolacja społeczna to cichy prroblem naszych czasów&nbsp;- razem możemy przerwać ten krąg i przywrócić poczucie bliskości</p>
            </div>
            <div className="mt-9">
                <h1 className="text-3xl">Artykuły</h1>
                <div className="mt-4 flex flex-wrap justify-between">
                    {/* Przykładowe Artykuły */}
                    <ArticleCard bgImage="https://picsum.photos/453/255" title="Samotność w tłumie – jak radzić sobie z izolacją społeczną w codziennym życiu?" />
                    <ArticleCard bgImage="https://picsum.photos/454/256" title="Izolacja społeczna w dobie cyfryzacji: Rozmowa z psychologiem o wpływie mediów społecznościowych na nasze relacje" />
                    <ArticleCard bgImage="https://picsum.photos/455/257" title="Izolacja społeczna: Psychologiczna perspektywa i sposoby na przełamanie barier" />
                    <ArticleCard bgImage="https://picsum.photos/456/258" title="Izolacja w erze post-pandemicznej: Jak powrócić do kontaktów międzyludzkich po długiej przerwie?" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
