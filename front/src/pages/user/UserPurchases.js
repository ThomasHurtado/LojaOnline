import api from '../../utils/api' 
import { useEffect, useState } from "react"
import styles from "./CartProducts.module.css"
import useFlashMessage from '../../hooks/useFlashMessage'


function UserPurchases(){

    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect (() =>{
        api.get('users/checkuser',{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            console.error(error);
        })

        const fetchSalesProducts = async () => {
            try {
                const response = await api.get('/sales//mypurchases', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                });
        
        
                const purchases = response.data.purchases;
        
                if (purchases && Array.isArray(purchases)) {
                    const detailedProducts = await Promise.all(purchases.map(async (purchase) => {
                        const productResponse = await api.get(`/products/getproduct/${purchase.productId}`)
                        const buyerResponse = await api.get(`/users/getuser/${purchase.buyer}`)

                        const productDetails = productResponse.data.product;
                        const buyerDetails = buyerResponse.data.user; // Buyer details
                        console.log(buyerDetails.name)
                        return {
                            ...productDetails,  
                            buyerName: buyerDetails.name, 
                            buyerPhone: buyerDetails.phone, 
                            quantity: purchase.quantity,
                            date: purchase.date
                        }
                    }));
                    
                    setProducts(detailedProducts);
                } else {
                    console.error('Resposta inválida do servidor - produtos não encontrados:', response.data);
                }
            } catch (error) {
                console.error('Erro ao obter produtos do carrinho:', error);
            }
        }

        if (token) {
            fetchSalesProducts();
        }

    }, [token])

    
    return(
        
        <section className={styles.productlist_header}>
            <h1>Carrinho</h1>
            <div className={styles.productlist_container}>
                {products.length > 0 ? (
                    <>

                    
                    
                    {products.map((product) => (
                        <div key={product._id} className={styles.product}>
                            <h2>Comparador: {product.buyerName}</h2>
                            <h2>{product.name}</h2>
                            <h2>{product.brand}</h2>
                            <h2>Quantidade: {product.quantity}</h2>
                            <h2>Valor recebido: ${(product.price*product.quantity*0.95)}</h2>
                            <h3>Telefone para contato: {product.buyerPhone}</h3>
                        
                        
                    </div>
                    ))}
                    </>
                    
                ) : (
                    <h1>Carrinho vazio</h1>
                )}
            </div>
        </section>
    )
}

export default UserPurchases