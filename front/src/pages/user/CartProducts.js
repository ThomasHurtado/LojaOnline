import {useState, useEffect} from 'react'
import api from '../../utils/api'
import styles from "./CartProducts.module.css"
import useFlashMessage from '../../hooks/useFlashMessage'

function CartProducts(){

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
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
        
        api.get('/cart/usercart', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setCart(response.data.cart)
        })

        if (token) {
            fetchCartProducts();
        }


    }, [token]);

    async function handleButtonClick(product){
        
        let msgText = 'Produto adicionado ao carrinho!'
        let msgType = 'success'
        console.log(product.id)
        try {
            
            const data = await api.patch(`/cart/addproduct/${product._id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) =>{
            return response.data
            })

        } catch (error) {
            if (error.response) {
              msgText = error.response.data.message;
            } else {
              msgText = 'Erro desconhecido. Tente novamente mais tarde.';
            }
            msgType = 'error';
            console.log(msgText);
          }

          setTimeout(() => {
            document.location.reload();
          }, 1500)
        
        setFlashMessage(msgText, msgType)
    }

    async function handleButtonClick2(product){

        let msgText = 'Produto adicionado ao carrinho!'
        let msgType = 'success'
        console.log(product.id)
        try {
            
            const data = await api.patch(`/cart/removeone/${product._id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) =>{
            return response.data
            })

        } catch (error) {
            if (error.response) {
              msgText = error.response.data.message;
            } else {
              msgText = 'Erro desconhecido. Tente novamente mais tarde.';
            }
            msgType = 'error';
            console.log(msgText);
          }

          setTimeout(() => {
            document.location.reload();
          }, 1500)
        
        setFlashMessage(msgText, msgType)
    }

    async function handleButtonClick3(cart){
        let msgText = 'Sua compra foi faturada!'
        let msgType = 'success'
        try {
            
            const data = await api.post(`/sales/finishsale/${cart._id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) =>{
            return response.data
            })

        } catch (error) {
            if (error.response) {
              msgText = error.response.data.message;
            } else {
              msgText = 'Erro desconhecido. Tente novamente mais tarde.';
            }
            msgType = 'error';
            console.log(msgText);
          }
          setTimeout(() => {
            document.location.reload();
          }, 1500)
        
        setFlashMessage(msgText, msgType)
    }

    

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
                            <button className={styles.product_button} onClick={() => handleButtonClick2(product)}>-</button>
                            {product.quantity}
                            <button className={styles.product_button} onClick={() => handleButtonClick(product)}>+</button>
                        </h2>
                    </div>
                    ))}
                    <div className={styles.product_checkout}>
                        <h2>Valor total: $ {cart.price}</h2>
                        <button className={styles.product_button2} onClick={() => handleButtonClick3(cart)}>Finalizar compra</button>
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