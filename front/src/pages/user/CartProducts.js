import { useState, useEffect } from 'react'
import api from '../../utils/api'
import styles from "./CartProducts.module.css"
import useFlashMessage from '../../hooks/useFlashMessage'
import { useContext } from 'react'
import { Context } from '../../context/UserContext'

function CartProducts() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const {fetchUser} = useContext(Context)

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart/usercart', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            });
            setCart(response.data.cart)
        } catch (error) {
            console.error('Erro ao obter o carrinho:', error);
        }
    };

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

    useEffect(() => {
        if (token) {
            fetchCart();
            fetchCartProducts();
        }
    }, [token]);

    const updateCartAndProducts = async (updateFunction) => {
        try {
            await updateFunction();
            await fetchCart();
            await fetchCartProducts();
            setFlashMessage('Operação realizada com sucesso!', 'success');
        } catch (error) {
            const msgText = error.response ? error.response.data.message : 'Erro desconhecido. Tente novamente mais tarde.';
            setFlashMessage(msgText, 'error');
            console.log(msgText);
        }
    };

    const handleAddProduct = (product) => updateCartAndProducts(() => api.patch(`/cart/addproduct/${product._id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }));

    const handleRemoveOneProduct = (product) => updateCartAndProducts(() => api.patch(`/cart/removeone/${product._id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }));

    const handleClearCart = () => updateCartAndProducts(() => api.patch(`/cart/clearcart`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }))

    const handleFinishSale = (cart) => {
        updateCartAndProducts(() => api.post(`/sales/finishsale/${cart._id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }))
        .then(() => {
            fetchUser();
        })
        .catch(error => {
            console.error("Error finishing sale:", error);
            
        });
    };

    const handleDeleteProduct = (product) => updateCartAndProducts(() => api.patch(`cart/deleteproduct/${product._id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
        }
    }));

    return (
        <section className={styles.productlist_header}>
            <h1>Carrinho</h1>
            <div className={styles.productlist_container}>
                {products.length > 0 ? (
                    <>
                    
                    {products.map((product) => (
                        <div key={product._id} className={styles.product}>
                            <h2>{product.name}</h2>
                            <h2>{product.brand}</h2>
                            <h2>${product.price}</h2>
                            <h2>{product.description}</h2>
                            <h2>
                                Quantidade:
                                <button className={styles.product_button} onClick={() => handleRemoveOneProduct(product)}>-</button>
                                {product.quantity}
                                <button className={styles.product_button} onClick={() => handleAddProduct(product)}>+</button>
                            </h2>
                            <button className={styles.product_button2} onClick={() => handleDeleteProduct(product)}>Excluir item</button>
                        </div>
                    ))}
                    
                        <div className={styles.product_checkout}>
                            <h2>Valor total: $ {cart.price}</h2>
                            <button className={styles.product_button2} onClick={() => handleFinishSale(cart)}>Finalizar compra</button>
                            <button className={styles.product_button2} onClick={() => handleClearCart(cart)}>Limpar carrinho</button>
                            
                        </div>
                    
                    </>
                ) : (
                    <h1>Carrinho vazio</h1>
                )}
            </div>
        </section>
    )
}

export default CartProducts
