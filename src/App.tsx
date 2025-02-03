import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { createContext, useEffect, useState } from "react";
import Loading from "./Components/Loading/Loading";
import { GlobalContextInterface } from "./typings";
import { Language, Theme } from "./typings/enums";
import Index from "./Routes/Index/Index";
import Login from "./Routes/Admin/Login";
import Panel from "./Routes/Admin/Panel";
import Article from "./Routes/Article/Article";

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
        <div className="flex-1 w-full flex flex-col justify-between items-center">
            <GlobalContext.Provider
                value={{ theme, setTheme, language, setLanguage }}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/articles" element={<></>} />
                    <Route path="/article/:articleId" element={<Article />} />
                    <Route path="/about" element={<></>} />
                    <Route path="/contact" element={<></>} />
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/panel" element={<Panel />} />
                    <Route path="*" element={<>404</>} />
                </Routes>
            </GlobalContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
