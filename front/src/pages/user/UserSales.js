import api from '../../utils/api' 
import { useEffect, useState } from "react"
import styles from "./CartProducts.module.css"
import { Link } from "react-router-dom";


function UserSales(){

    const [products, setProducts] = useState([])
    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    

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
                const response = await api.get('/sales/mysales', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                });
        
        
                const productsWithQuantity = response.data.productsWithQuantity;
        
                if (productsWithQuantity && Array.isArray(productsWithQuantity)) {
                    const detailedProducts = await Promise.all(productsWithQuantity.map(async (productWithQuantity) => {
                        const productResponse = await api.get(`/products/getproduct/${productWithQuantity.productId}`);
                        
                        
                        return {
                            ...productResponse.data.product,
                            quantity: productWithQuantity.quantity,
                            date: productWithQuantity.date
                        };
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
            <h1>Compras de {user.name}</h1>
            <div className={styles.productlist_container}>
                {products.length > 0 ? (
                    <>  
                    {products.map((product) => (
                        <div key={product._id} className={styles.product}>
                        <h2>Você comprou:</h2>
                        <h2>{product.name}</h2>
                        <h2>Unidades: {product.quantity}</h2>
                        <h2>Valor pago: ${product.price*product.quantity}</h2>
                        <h2>Data da compra: {(product.date)}</h2>
                        
                        
                    </div>
                    ))}
                    
                    </>
                    
                ) : (
                    <h1>
                        Você não fez nenhuma compra ainda, clique 
                        <Link to='/home' style={{ marginLeft: '10px', marginRight: '10px', fontWeight: 'bold', textDecoration: 'underline' }}>
                        aqui
                        </Link> 
                        para buscar por produtos!
                    </h1>
                )}
            </div>
        </section>
        
        
    )
}

export default UserSales