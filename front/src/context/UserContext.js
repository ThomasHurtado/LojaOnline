import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }){

    const { auth, register } = useAuth()

    return(
        <Context.Provider value = {{auth, register}}>
            {children}
        </Context.Provider>
    )

}

export { Context, UserProvider }