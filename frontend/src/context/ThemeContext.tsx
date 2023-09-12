import { createContext, useEffect, useState } from "react";

interface IThemeContext {
    theme: 'dark' | 'light',
    setTheme: (theme: 'dark' | 'light') => void
}

export const ThemeContext = createContext({} as IThemeContext);

export const ThemeProvider = ({ children }: any) => {

    const [theme, setTheme] = useState<'dark' | 'light'>('light');
    
    const rawSetTheme = () => {
        const method = theme === 'dark' ? 'add' : 'remove';
        document.documentElement.classList[method]('dark');
        if(method === 'remove'){
            localStorage.setItem('theme','light');
        }else{
            localStorage.setItem('theme','dark')
        }
    }

    const checkDarkMode = () => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    
    useEffect(()=>{
        checkDarkMode();
    },[]);

    useEffect(() => {
        rawSetTheme();
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
