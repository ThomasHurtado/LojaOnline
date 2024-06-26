import api from '../../utils/api' 
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./CartProducts.module.css"
import useFlashMessage from '../../hooks/useFlashMessage'

function UserProducts(){

    const [user, setUSer] = useState({})
    const [products, setProducts] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()

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

    async function handleDeleteProduct(product){

        let msgText = 'Produto deletado com sucesso!'
        let msgType = 'success'
        
        try {
            
            const data = await api.delete(`/products/deleteproduct/${product._id}`, {
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

        window.location.reload()

    }

    

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
                        <button className={styles.product_button2} onClick={() => handleDeleteProduct(product)}>Excluir item</button>
                    </div>
                    ))}
                    </>
                    
                ) : (
                    <h1>
                        Você não possue nenhum produto, clique 
                        <Link to='/product/register' style={{ marginLeft: '10px', marginRight: '10px', fontWeight: 'bold', textDecoration: 'underline' }}>
                        aqui
                        </Link> 
                        para cadastrar novos itens!
                    </h1>
                )}
            </div>
        </section>
        
        
    )
}

export default UserProducts