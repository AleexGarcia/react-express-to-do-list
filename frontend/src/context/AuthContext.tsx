import { createContext, useState } from "react";

interface IAppContext {
    user: string | null,
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void
    setUser: (user: string | null) => void
}


export const AppContext = createContext({} as IAppContext);

export const AppContextProvider = ({children}: any) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null);

    return (
        <AppContext.Provider value={{user, setUser, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
}