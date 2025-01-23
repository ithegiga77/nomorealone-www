import { Link } from "react-router-dom";
import { Theme } from "../../App";

interface Props {
    theme: Theme;
    toggleTheme: () => void;
}

const tabs = [
    {
        name: "Artykuły",
        route: "articles",
    },
    {
        name: "O nas",
        route: "about",
    },
    {
        name: "Kontakt",
        route: "contact",
    },
];

const Header = ({ theme, toggleTheme }: Props) => {
    return (
        <div className="w-full flex p-10 bg-white text-[black] dark:bg-[#18181a] dark:text-white shadow-[0px_4px_24px_-4px_rgba(0,0,0,0.8)] toggle_theme">
            <div>
                <span className="text-5xl tracking-wider font-light">
                    Bez barier
                </span>
            </div>
            <div className="flex-1 flex gap-7 justify-end">
                {tabs.map((tab) => (
                    <Link
                        to={`/${tab.route}`}
                        key={`header-tab-${tab.route}`}
                        className="flex items-center font-light text-xl hover:-translate-y-[2px] transition-transform duration-200 ease-in-out"
                    >
                        {tab.name}
                    </Link>
                ))}
                <div className="flex items-center">
                    <button
                        onClick={toggleTheme}
                        className="bg-gray-700 border-1 border-black dark:border-white w-14 h-8 rounded-full relative"
                    >
                        <div
                            className={`absolute top-[4px] w-[26px] h-6 bg-gray-300 rounded-full transition-all duration-200 ease-in-out ${
                                theme === Theme.light
                                    ? "left-[4px]"
                                    : "left-[26px]"
                            }`}
                        ></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
