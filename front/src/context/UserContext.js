import { createContext, useState, useEffect} from "react";
import api from "../utils/api";
import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({ children }){
    
    const { auth, register, logout, login, updatedMoneyPlus, updatedMoneyMinus} = useAuth()
    const [user, setUser] = useState({});
    const [token1] = useState(localStorage.getItem('token') || '');

    const fetchUser = async () => {
        try {
            const response = await api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token1)}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
        }
    };

    useEffect(() => {
        if(token1){
        fetchUser()
        }
    }, [token1]);

    return(
        <Context.Provider value = {{auth, register, logout, login, updatedMoneyPlus, updatedMoneyMinus, fetchUser, user, token1 }}>
            {children}
        </Context.Provider>
    )

}

export { Context, UserProvider }