import { Link } from "react-router-dom";
import { tabs } from "./Header";

const Tabs = () => {
    return (
        <div className="hidden lg:flex flex-1 gap-7 justify-end whitespace-nowrap">
            {tabs.map((tab) => (
                <Link
                    to={`/${tab.route}`}
                    key={`header-tab-${tab.route}`}
                    className={`flex justify-center items-center text-xl text-gray-950 dark:text-white hover:-translate-y-[2px] transition-all duration-200 ease-in-out`}
                >
                    {tab.name}
                </Link>
            ))}
        </div>
    );
};

export default Tabs;
