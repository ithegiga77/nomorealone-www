import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { createContext, useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import { GlobalContextInterface } from "./typings";
import { Language, Theme } from "./typings/enums";
import ArticleCard from "./Components/ArticleCard/ArticleCard";
import Index from "./Routes/Index";

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
                    <Route path="/" element={<Index />} />
                    <Route path="/articles" element={<></>} />
                    <Route path="/articles/:articleId" element={<></>} />
                    <Route path="/about" element={<></>} />
                    <Route path="/contact" element={<></>} />
                    <Route path="*" element={<>404</>} />
                </Routes>
            </GlobalContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
