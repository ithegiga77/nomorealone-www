import { useState } from "react";
import { Link } from "react-router-dom";

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

const Tabs = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            className={`absolute lg:relative top-full w-full lg:flex-1 bg-inherit flex flex-col lg:flex-row lg:justify-end max-lg:shadow-[0px_20px_24px_-20px_rgba(0,0,0,0.8)]`}
        >
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer flex justify-end p-3 lg:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 1024 1024"
                    className={`transition-transform duration-300 ease-in-out ${
                        isOpen ? "" : "rotate-90"
                    }`}
                >
                    <path
                        fill="currentColor"
                        d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
                    />
                </svg>
            </div>
            <div
                className={`auto_height flex flex-col lg:flex-row lg:items-center lg:gap-7 transition-all duration-200 ease-in-out overflow-hidden ${
                    isOpen
                        ? "max-lg:h-auto max-lg:opacity-100"
                        : "max-lg:h-0 max-lg:opacity-0"
                }`}
            >
                {tabs.map((tab) => (
                    <Link
                        to={`/${tab.route}`}
                        key={`header-tab-${tab.route}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex justify-center items-center py-3 lg:py-0 border-t-[1px] border-slate-300 lg:border-none font-light text-xl text-black dark:text-white hover:bg-slate-300 dark:hover:bg-[#2e2e31] lg:hover:bg-inherit lg:hover:-translate-y-[2px] transition-all duration-200 ease-in-out`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
