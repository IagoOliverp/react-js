import React, { useState, useEffect } from 'react';
import { Menu } from '../../components/Menu';
import { Navigate, useParams, Link} from 'react-router-dom';
import api from '../../config/configApi';
import { servDeleteUser } from '../../services/ServDeleteUser';

export const EditUserImage = (props) => {

    const { id } = useParams();

    const [endImg, setEndImg] = useState('');

    const [image, setImage] = useState('');

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const EditUser = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        const headers = {
                'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/edit-user-image/" + id, formData, headers)
        .then((response) => {
            setStatus({
                type: 'redSuccess',
                mensagem: response.data.mensagem
            });
        }).catch((err) => {
            if (err.response) {
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                });
            } else {
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                });
            }
        });

    }

useEffect(() => {
    const getUser = async () => {

        const headers = {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.get("/user/" + id, headers)
        .then((response) => {
            if (response.data.user){
                setEndImg(response.data.endImage);
            } else {
                setStatus({
                    type: 'redWarning',
                    mensagem: "Erro: Usuário não encontrado!"
                });
            }
        }).catch((err) => {
            if (err.response) {
                setStatus({
                    type: 'redWarning',
                    mensagem: err.response.data.mensagem
                });
            }else {
                setStatus({
                    type: 'redWarning',
                    mensagem: "Erro: Tente mais tarde!"
                });
            }
        })

    }
    getUser()
},[id]);

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser);
        if (response) {
            if (response.type === "success"){
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.mensagem
                })
            }else {
                setStatus({
                    type: "error",
                    mensagem: response.mensagem
                })
            }
        } else {
            setStatus({
                type: 'redWarning',
                mensagem: 'Erro: Tente mais tarde'
            })
        }
    }

    const mensagemAdd = {
        type: 'success',
        mensagem: status.mensagem
    }

    const mensagemAdd2 = {
        type: "error",
        mensagem: status.mensagem
    }

    return (
        <div>
            <Menu />

            <h1>Editar Foto do Perfil</h1>

            <Link to="/users"><button type="button">Listar</button></Link>{" "}
            <Link to={"/view-user/" + id}><button type="button">Visualizar</button></Link>{" "}
            <Link to="#"><button type="button" onClick={() => deleteUser(id)}>Apagar</button></Link>{" "}
            <hr />

            {status.type === 'redSuccess' ? <Navigate to= {"/view-user/" + id} state={mensagemAdd}/> : ""}
            {status.type === 'redWarning' ? <Navigate to= "/users" state={mensagemAdd2}/>: ""}
            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
            

            <form onSubmit={EditUser}>
                <label>Imagem*: </label>
                    <input type="file" name="image" onChange={e => setImage(e.target.files[0])}/><br /><br />

                    {image ? <img src={URL.createObjectURL(image)} alt="Imagem do Usuário" width="150" height="150" /> 
                    : <img src={endImg} alt="Imagem do Usuário" width="150" height="150"/>}<br /><br />

                    * Campo obrigatório<br /><br />
                    <button type="submit">Salvar</button>

            </form>
            

        </div>
    )
}