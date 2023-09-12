import { createContext, useEffect, useState } from "react";

interface IThemeContext {
    isDarkTheme: boolean,
    setTheme: (theme: boolean) => void
}

export const ThemeContext = createContext({} as IThemeContext);

export const ThemeProvider = ({ children }: any) => {

    const [isDarkTheme, setTheme] = useState<boolean>(false);

    const rawSetTheme = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme(true);
            document.documentElement.classList.add('dark');
        } else {
            setTheme(false);
            document.documentElement.classList.remove('dark');
        }
    }

    useEffect(() => {
        rawSetTheme();
    }, [isDarkTheme]);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
