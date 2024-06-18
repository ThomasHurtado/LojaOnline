import {useState, useEffect} from 'react'
import api from '../utils/api'
import styles from "./product/Dashboard.module.css"
import useFlashMessage from '../hooks/useFlashMessage'

function Home(){

    const [products, setProducts] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

    useEffect(() =>{

        api.get('/products/allproducts', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setProducts(response.data.products)
        })

        
    }, [token])

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

        setFlashMessage(msgText, msgType)
    }
    return(
        <section className={styles.productlist_header}>
            <h1>Selecione os itens desejados</h1>
            <div className={styles.productlist_container}>
                {products.length > 0 &&
                    products.map((product) => (
                        <div className={styles.product} key={product._id}>
                            <h2>{product.name}</h2>
                            <h2>Marca: {product.brand}</h2>
                            <h2>${product.price}</h2>
                            <div>
                                <button className={styles.product_button} onClick={() => handleButtonClick(product)}>Adicionar ao carrinho</button>
                            </div>
                        </div>
                    
                ))
                }
                {products.length === 0 && <h1>Item nao encontrado</h1>}
            </div>
        </section>
    )
}

export default Home