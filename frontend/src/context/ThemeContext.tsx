import { createContext, useEffect, useState } from "react";

interface IThemeContext {
    theme: 'dark' | 'light',
    setTheme: (theme: 'dark' | 'light') => void
}

export const ThemeContext = createContext({} as IThemeContext);

export const ThemeProvider = ({ children }: any) => {

    const checkTheme = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        } else {
            return 'light';
        }
    }

    const [theme, setTheme] = useState<'dark' | 'light'>(checkTheme());
    
    const rawSetTheme = () => {
        const isDark = theme === 'dark';
        if(isDark){
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme','dark');
        }else{
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme','light')
        }
    }

    useEffect(() => {
        rawSetTheme();
    },[theme]);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
