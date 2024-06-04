import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }){

    const { auth, register, logout, login } = useAuth()

    return(
        <Context.Provider value = {{auth, register, logout, login}}>
            {children}
        </Context.Provider>
    )

}

export { Context, UserProvider }