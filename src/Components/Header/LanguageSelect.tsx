import { SetStateAction, useContext } from "react";
import pl from "./../../assets/pl.jpg";
import ua from "./../../assets/ua.jpg";
import { GlobalContext } from "../../App";
import { Language } from "../../typings/enums";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const LanguageSelect = ({ isOpen, setIsOpen }: Props) => {
    const { language, setLanguage } = useContext(GlobalContext);
    const toggleLanguage = (key: Language) => {
        setLanguage(key);
        localStorage.setItem("language", key);
    };

    return (
        <div className="flex items-center">
            <div
                className="flex items-center gap cursor-pointer select-none relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="flex items-center gap-1 px-1">
                    <img
                        className="w-6 object-contain"
                        src={language === Language.pl ? pl : ua}
                    />
                    <span className="tracking-wider font-medium">
                        {language}
                    </span>
                </div>
                <div
                    className={`auto_height px-1 flex items-center gap-1 top-full absolute overflow-hidden select-none transition-all duration-300 ease-in-out ${
                        isOpen
                            ? "h-auto shadow-[0px_4px_24px_-4px_rgba(0,0,0,0.8)] opacity-100"
                            : "h-0 opacity-0"
                    }`}
                    onClick={() => {
                        toggleLanguage(
                            language === Language.pl ? Language.ua : Language.pl
                        );
                        setIsOpen(false);
                    }}
                >
                    <img
                        className="w-6 object-contain"
                        src={language === Language.pl ? ua : pl}
                    />
                    <span className="tracking-wider font-medium">
                        {language === Language.pl ? Language.ua : Language.pl}
                    </span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 1024 1024"
                    className={`transition-transform duration-300 ease-in-out ${
                        isOpen ? "" : "-rotate-90"
                    }`}
                >
                    <path
                        fill="currentColor"
                        d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default LanguageSelect;
