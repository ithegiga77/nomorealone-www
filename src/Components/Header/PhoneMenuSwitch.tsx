import { SetStateAction } from "react";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const PhoneMenuSwitch = ({ isOpen, setIsOpen }: Props) => {
    return (
        <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer flex p-3 lg:hidden"
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
    );
};

export default PhoneMenuSwitch;
