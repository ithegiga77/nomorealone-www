import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";

export enum Theme {
    light = "Light",
    dark = "Dark",
}

function App() {
    const [theme, setTheme] = useState<Theme>(() => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === Theme.light || currentTheme === Theme.dark)
            return currentTheme;
        return Theme.light;
    });

    const toggleTheme = () => {
        setTheme((prev) => (prev === Theme.light ? Theme.dark : Theme.light));
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === Theme.dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="flex-1 w-full flex flex-col justify-between">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <Routes>
                <Route path="/" element={<></>} />
                <Route path="/articles" element={<></>} />
                <Route path="/articles/:articleId" element={<></>} />
                <Route path="/about" element={<></>} />
                <Route path="/contact" element={<></>} />
                <Route path="*" element={<>404</>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
