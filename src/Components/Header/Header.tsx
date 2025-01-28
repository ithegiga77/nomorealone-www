import { useState } from "react";
import LanguageSelect from "./LanguageSelect";
import Tabs from "./Tabs";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    function handleTitlteClick() {
        window.location.href = '/';
    }

    return (
        <div className="mt-3 w-full flex justify-between gap-7 text-gray-950 relative dark:text-white rounded-3xl shadow-[0px_5px_3px_-3px_rgba(0,0,0,0.3)] toggle_theme">
            <div onClick={handleTitlteClick} className="p-6 cursor-pointer">
                <span className="text-3xl tracking-wider">
                    Bez barier
                </span>
            </div>
            <Tabs />
            <div className="flex gap-7 p-6 flex-wrap lg:flex-nowrap">
                <LanguageSelect isOpen={isOpen} setIsOpen={setIsOpen} />
                <ThemeSwitch />
            </div>
        </div>
    );
};

export default Header;
