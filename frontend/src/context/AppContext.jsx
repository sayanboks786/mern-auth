import { createContext, useState } from "react";

export const AppContext =createContext()

export const AppContextProvider = (props) => {

    const BackendUri = import.meta.env.VITE_BACKEND_URI
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const value ={
        BackendUri,
        isLoggedin, setIsLoggedin,
        userData, setUserData, 
    }
return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}