import { SetStateAction } from "react";
import { Link } from "react-router-dom";
import { tabs } from "./Header";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const PhoneMenu = ({ isOpen, setIsOpen }: Props) => {
    return (
        <div
            className={`block lg:hidden auto_height transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "h-auto opacity-100" : "h-0 opacity-0"
            }`}
        >
            {tabs.map((tab) => (
                <Link
                    to={`/${tab.route}`}
                    key={`header-tab-${tab.route}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex justify-center items-center py-3 text-xl text-gray-950 dark:text-white hover:bg-[#e6e3e3] hover:dark:bg-[#1e1e20] hover:-translate-y-[2px] transition-all duration-200 ease-in-out`}
                >
                    {tab.name}
                </Link>
            ))}
        </div>
    );
};

export default PhoneMenu;
