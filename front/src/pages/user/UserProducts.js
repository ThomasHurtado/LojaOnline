import api from '../../utils/api' 
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./CartProducts.module.css"

function UserProducts(){

    const [user, setUSer] = useState({})
    const [products, setProducts] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect (() =>{
        api.get('users/checkuser',{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUSer(response.data)
        }).catch((error) => {
            console.error(error);
        })

        api.get('products/myproducts',{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setProducts(response.data.product)
        }).catch((error) => {
            console.error(error);
        })
    }, [token])

    

    return(
        
        <section>
            <h1>Produtos de {user.name}</h1>
            <div className={styles.productlist_container}>
                {products.length > 0 ? (
                    <>
                    {products.map((product) => (
                        <div key={product._id} className={styles.product}>
                        <h2>{product.name}</h2>
                        <h2>Marca: {product.brand}</h2>
                        <h2>${product.price}</h2>
                        <h2>Estoque: {product.amount}</h2>
                        <Link className={styles.product_button2} to={`/editproduct/${product._id}`}>Editar</Link>
                        
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

export default UserProducts