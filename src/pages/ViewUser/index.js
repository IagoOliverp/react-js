import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import { servDeleteUser } from '../../services/ServDeleteUser';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const Viewuser = (props) => {

    const { state } = useLocation()

    const [data, setData] = useState('');

    const [endImg, setEndImg] = useState('');    

    const {id} = useParams()

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {

        const getUser = async () => {

            const headers = {
                'headers': {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

            await api.get("/user/" + id, headers)
            .then((response) => {
                if (response.data.user) {
                    setEndImg(response.data.endImage)
                    setData(response.data.user)
                } else {
                    setStatus({
                        type: 'redError',
                        mensagem: 'Usuário não encontrado!'
                    });
                }
            }).catch((err) => {
                if(err.response){
                    setStatus({
                        type: 'redError',
                        mensagem: err.response.data.mensagem
                    });
                } else{
                    setStatus({
                        type: 'redError',
                        mensagem: 'Erro, tente mais tarde!'
                    });
                }
            })
        }

        getUser();
    },[id])

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser);

        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: "redSuccess",
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: response.type,
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: "redError",
                mensagem: "Erro: Tente mais tarde!"
            });
        }
    }


    /*const mensagemAdd = {
        type: status.type,
        mensagem: status.mensagem
    }*/

    const mensagemAdd = {
        type: "success",
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
                            <span class="title-content">Detalhes do Usuário</span>
                            <div class="top-content-adm-right">
                            <Link to={"/edit-user/" + data.id}><button type="button" className="btn-warning">Editar</button></Link>{" "}
                            <Link to={"/edit-user-password/" + data.id}><button type="button" className="btn-warning">Editar Senha</button></Link>{" "}
                            <Link to={"/edit-user-image/" + id}><button type="button" className="btn-warning">Editar Imagem</button></Link>{" "}
                            <Link to="/users"><button type="button" className="btn-primary">Listar</button></Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ? <Navigate to="/users" state={mensagemAdd}/> : ""}   
                            {status.type === 'redError' ? <Navigate to="/users" state={mensagemAdd2}/> : ""}
                        </div>

                        <div className="content-adm">
                            <span>{<img src={endImg} alt="Imagem do Usuário" width="150" height="150"/>}</span><br />
                            <div className="view-desc-adm">
                                <span className="title-desc">ID: </span>
                                <span className="info-desc">{data.id}</span>
                            </div>
                            <div className="view-desc-adm">
                                <span className="title-desc">Nome: </span>
                                <span className="info-desc">{data.name}</span>
                            </div>
                            <div className="view-desc-adm">
                                <span className="title-desc">E-mail: </span>
                                <span className="info-desc">{data.email}</span>
                            </div>
                            <button type="button" onClick={() => deleteUser(data.id)} className="btn-danger">Apagar</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};