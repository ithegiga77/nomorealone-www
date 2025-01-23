import { useState } from "react";
import LanguageSelect from "./LanguageSelect";
import Tabs from "./Tabs";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="w-full flex justify-between gap-7 bg-white text-[black] dark:bg-[#18181a] relative dark:text-white shadow-[0px_4px_24px_-4px_rgba(0,0,0,0.8)] toggle_theme">
            <div className="p-10">
                <span className="text-5xl tracking-wider font-light">
                    Bez barier
                </span>
            </div>
            <Tabs />
            <div className="flex gap-7 p-10 flex-wrap lg:flex-nowrap">
                <LanguageSelect isOpen={isOpen} setIsOpen={setIsOpen} />
                <ThemeSwitch />
            </div>
        </div>
    );
};

export default Header;
