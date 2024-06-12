import {useState, useEffect} from 'react'
import api from '../../utils/api'
import styles from "../product/Dashboard.module.css"
import useFlashMessage from '../../hooks/useFlashMessage'

function CartProducts(){

    const [products, setProducts] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await api.get('/cart/getcart', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`
                    }
                });
        
                console.log('Resposta do servidor:', response.data);
        
                const productsWithQuantity = response.data.productsWithQuantity;
        
                if (productsWithQuantity && Array.isArray(productsWithQuantity)) {
                    const detailedProducts = await Promise.all(productsWithQuantity.map(async (productWithQuantity) => {
                        const productResponse = await api.get(`/products/getproduct/${productWithQuantity.productId}`);
                        console.log("AQUI", productResponse.data)
                        
                        return {
                            ...productResponse.data.product,
                            quantity: productWithQuantity.quantity
                        };
                    }));
                    
                    setProducts(detailedProducts);
                } else {
                    console.error('Resposta inválida do servidor - produtos não encontrados:', response.data);
                }
            } catch (error) {
                console.error('Erro ao obter produtos do carrinho:', error);
            }
        };
        
                

        if (token) {
            fetchCartProducts();
        }
    }, [token]);

    return (
        <section className={styles.productlist_header}>
            <h1>Selecione os itens desejados</h1>
            <div className={styles.productlist_container}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className={styles.product}>
                        <h2>{product.name}</h2>
                        <h2>{product.brand}</h2>
                        <h2>${product.price}</h2>
                        <h2>Quantidade: {product.quantity}</h2>
                    </div>
                    ))
                ) : (
                    <h1>Item não encontrado</h1>
                )}
            </div>
        </section>    
    )
}

export default CartProducts