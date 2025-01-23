import { useContext } from "react";
import { GlobalContext } from "../../App";
import { Theme } from "../../typings/enums";

const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(GlobalContext);

    const toggleTheme = () => {
        setTheme((prev: Theme) => {
            const newTheme = prev === Theme.light ? Theme.dark : Theme.light;
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.toggle(
                "dark",
                newTheme === Theme.dark
            );
            return newTheme;
        });
    };

    return (
        <div className="flex items-center">
            <button
                onClick={toggleTheme}
                className="bg-gray-700 border-1 border-black dark:border-white w-12 h-6 rounded-full relative"
            >
                <div
                    className={`absolute top-[2px] w-5 h-5 bg-gray-300 rounded-full transition-all duration-200 ease-in-out ${
                        theme === Theme.light ? "left-[2px]" : "left-[26px]"
                    }`}
                ></div>
            </button>
        </div>
    );
};

export default ThemeSwitch;
