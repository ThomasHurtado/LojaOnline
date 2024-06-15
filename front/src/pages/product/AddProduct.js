import Input from "../../components/Input"
import styles from "./AddProduct.module.css"
import {useState, useEffect} from 'react'
import api from "../../utils/api"
import useFlashMessage from "../../hooks/useFlashMessage"
function AddProduct(){

    const [product, setProduct] = useState({})
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    function hadleChange(e){
        setProduct({...product, [e.target.name]: e.target.value})
    }

    async function handleSubimit(e){
        e.preventDefault()
        
        let msgText = 'Produto cadastrado com sucesso!'
        let msgType = 'success'

        try {
            
            const data = await api.post('/products/register', product, {
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
            <h1>Cadastrar Produto</h1>
            <form onSubmit={handleSubimit} className={styles.formulario}> 
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Marca"
                    type="text"
                    name="brand"
                    placeholder="Digite o nome da marca"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Estoque"
                    type="text"
                    name="amount"
                    placeholder="Digite a quantidade disponivel do produto"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Descrição"
                    type="text"
                    name="description"
                    placeholder="Digite a descrição do produto"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Preço (taxa de 5%)"
                    type="number"
                    name="price"
                    placeholder="Digite o preço do item"
                    hadleOnChange={hadleChange}
                />
                <input type="submit" value="Cadastar"/>
            </form>
        </section>
    )
}

export default AddProduct