import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
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
            <Navbar />
            <div className="content">
                <Sidebar active="users"/>

                <div class="wrapper">
                    <div class="row">
                        <div class="top-content-adm">
                            <span class="title-content">Editar Foto do Usuário</span>

                            <div class="top-content-adm-right">  
                                <Link to="/users"><button type="button" className="btn-primary">Listar</button></Link>{" "}
                                <Link to={"/view-user/" + id}><button type="button" className="btn-info">Visualizar</button></Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ? <Navigate to= {"/view-user/" + id} state={mensagemAdd}/> : ""}   
                            {status.type === 'redWarning' ? <Navigate to= "/users" state={mensagemAdd2}/>: ""}
                            {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">

                            <form onSubmit={EditUser}>
                                {image ? <img src={URL.createObjectURL(image)} alt="Imagem do Usuário" width="150" height="150"/> 
                                : <img src={endImg} alt="Imagem do Usuário" width="150" height="150"/>}<br /><br />

                                <label>Imagem: </label><br /><br />
                                <input type="file" name="image" onChange={e => setImage(e.target.files[0])}/><br /><br />

                                {/*image ? <img src={URL.createObjectURL(image)} alt="Imagem do Usuário" width="150" height="150"/> 
                                : <img src={endImg} alt="Imagem do Usuário" width="150" height="150"/>*/}

                                * Campo obrigatório<br /><br />
                                <button type="submit" className="btn-success">Salvar</button>{" "}
                                <button type="button" onClick={() => deleteUser(id)} className="btn-danger">Apagar</button>

                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}