import { createContext } from "react";

import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }){

    const { auth, register, logout, login, updatedMoneyPlus, updatedMoneyMinus } = useAuth()

    return(
        <Context.Provider value = {{auth, register, logout, login, updatedMoneyPlus, updatedMoneyMinus}}>
            {children}
        </Context.Provider>
    )

}

export { Context, UserProvider }