import { Language, Theme } from "./enums";

export interface GlobalContextInterface {
    theme: Theme;
    setTheme: React.Dispatch<SetStateAction<Theme | undefined>>;
    language: Language;
    setLanguage: React.Dispatch<SetStateAction<Language | undefined>>;
}
