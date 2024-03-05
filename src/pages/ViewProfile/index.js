import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';


export const ViewProfile = () => {

    const { state } = useLocation();

    const [data, setData] = useState('')

    const [endImg, setEndImg] = useState('')

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

            await api.get("/view-profile", headers)
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
    },[])


    /*const mensagemAdd = {
        type: status.type,
        mensagem: status.mensagem
    }*/

    const mensagemAdd = {
        type: "error",
        mensagem: status.mensagem
    }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="profile"/>

                <div class="wrapper">
                    <div class="row">
                        <div class="top-content-adm">
                            <span class="title-content">Perfil</span>
                            <div class="top-content-adm-right">

                            <Link to="/edit-profile"><button type="button" className="btn-warning">Editar</button></Link>{" "}
                            <Link to="/edit-profile-password"><button type="button" className="btn-warning">Editar Senha</button></Link>{" "}
                            <Link to="/edit-profile-image"><button type="button" className="btn-warning">Editar Imagem</button></Link>{" "}
                            <Link to={"/view-user/" + data.id}><button type="button" className="btn-info">Visualizar</button></Link>{" "}
                            <Link to="/users"><button type="button" className="btn-primary">Listar</button></Link>{" "}
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redError' ? <Navigate to="/login" state={mensagemAdd}/> : ""}
                            {status.type === "success" ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <span><img src={endImg} alt="Imagem do Usuário" width="150" height="150"/></span><br />
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};
