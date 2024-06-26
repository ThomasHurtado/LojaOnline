import api from '../../utils/api' 
import { useEffect, useState } from "react"
import Input from "../../components/Input"
import styles from "./AddProduct.module.css"
import useFlashMessage from "../../hooks/useFlashMessage"
import { useParams } from 'react-router-dom'


function EditProduct(){

    const [user, setUSer] = useState({})
    const [product, setProduct] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    let { productId } = useParams()

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

        api.get(`products/getproduct/${productId}`,{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setProduct(response.data.product)
        }).catch((error) => {
            console.error(error);
        })
    }, [token])

    function hadleChange(e){
        setProduct({...product, [e.target.name]: e.target.value})
    }

    async function handleSubimit(e){
        e.preventDefault()
        
        let msgText = 'Produto atualizado com sucesso!'
        let msgType = 'success'

        try {
            
            const data = await api.patch(`products/editproduct/${productId}`, product, {
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
        
        <section>
            <h1>Editar produto</h1>
            <form onSubmit={handleSubimit} className={styles.formulario}> 
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto"
                    hadleOnChange={hadleChange}
                    value = {product.name || ''}
                />
                <Input
                    text="Marca"
                    type="text"
                    name="brand"
                    placeholder="Digite o nome da marca"
                    hadleOnChange={hadleChange}
                    value = {product.brand || ''}
                />
                <Input
                    text="Estoque"
                    type="text"
                    name="amount"
                    placeholder="Digite a quantidade disponivel do produto"
                    hadleOnChange={hadleChange}
                    value = {product.amount || ''}
                />
                <Input
                    text="Descrição"
                    type="text"
                    name="description"
                    placeholder="Digite a descrição do produto"
                    hadleOnChange={hadleChange}
                    value = {product.description || ''}
                />
                <Input
                    text="Preço (taxa de 5%)"
                    type="number"
                    name="price"
                    placeholder="Digite o preço do item"
                    hadleOnChange={hadleChange}
                    value = {product.price || ''}
                />
                <input type="submit" value="Salvar"/>
            </form>
            
        </section>
        
        
    )
}

export default EditProduct