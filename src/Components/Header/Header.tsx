import { useState } from "react";
import Tabs from "./Tabs";
import PhoneMenuSwitch from "./PhoneMenuSwitch";
import ThemeSwitch from "./ThemeSwitch";
import LanguageSelect from "./LanguageSelect";
import PhoneMenu from "./PhoneMenu";

export const tabs = [
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

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    function handleTitlteClick() {
        window.location.href = "/";
    }

    return (
        <div className="flex flex-col mt-3 w-full bg-white dark:bg-[#18181a] text-gray-950 dark:text-white rounded-3xl shadow-[0px_5px_8px_2px_rgba(0,0,0,0.3)] toggle_theme overflow-hidden">
            <div className="flex justify-between sm:gap-7 flex-wrap relative">
                <div
                    onClick={handleTitlteClick}
                    className="max-sm:flex-1 max-sm:py-2 p-4 lg:p-6 cursor-pointer flex justify-center items-center"
                >
                    <span className="text-3xl tracking-wider whitespace-nowrap">
                        Bez barier
                    </span>
                </div>
                <Tabs />
                <div className="max-sm:py-2 max-sm:flex-1 flex gap-7 p-4 lg:p-6 justify-center">
                    <LanguageSelect />
                    <ThemeSwitch />
                    <PhoneMenuSwitch isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            </div>
            <PhoneMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Header;
