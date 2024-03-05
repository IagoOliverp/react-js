import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';
import { useParams, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { servDeleteUser } from '../../services/ServDeleteUser';

export const EditUser = (props) => {

    const {id} = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const EditUser = async e => {
        e.preventDefault();

        if (!validate()) return;

        const headers = {
            'headers': {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

        await api.put("/user", {id, name, email}, headers)
        .then((response) => {
            setStatus({
                type: 'redSuccess',
                mensagem: response.data.mensagem
            });
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                });
            }else {
                setStatus({
                    type: 'error',
                    mensagem: 'Erro: Tente mais tarde!'
                });
            }
        })
    }

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
                    setName(response.data.user.name);
                    setEmail(response.data.user.email);
                } else {
                    setStatus({
                        type: 'redWarning',
                        mensagem: 'Usuário não encontrado!'
                    });
                }
            }).catch((err) => {
                if(err.response){
                    setStatus({
                        type: 'redWarning',
                        mensagem: err.response.data.mensagem
                    });
                } else{
                    setStatus({
                        type: 'redWarning',
                        mensagem: 'Erro, tente mais tarde!'
                    });
                }
            })
        }

        getUser();
    },[id])

    function validate(){
        if(!name) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o campo!'});
        if(!email) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o e-mail!'});
        /*if(!password) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o senha!'})
        if(password.length < 6 ) return setStatus({type: 'error', mensagem: 'Erro: A senha deve ter no mínimo 6 caracteres!'})*/

        return true;
    }

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
                type: 'error',
                mensagem: 'Erro: Tente mais tarde'
            })
        }
    }


    const mensagemAdd = {
        type: 'error',
        mensagem: status.mensagem
    }
    const mensagemAdd2 = {
        type: 'success',
        mensagem: status.mensagem
    }


    return (
        <div>
        <Navbar />
            <div className="content">
                <Sidebar active="users"/>
                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Editar Usuário</span>
                            <div className="top-content-adm-right">

                            <Link to="/users"><button type="button" className="btn-primary">Listar</button></Link>{" "}
                            <Link to={"/view-user/" + id}><button type="button" className="btn-info">Visualizar</button></Link>{" "}
                                
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ? <Navigate to="/users" state={mensagemAdd}/> : ""}
                            {status.type === "redSuccess" ? <Navigate to="/users" state={mensagemAdd2}/> : ""}
                            {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">

                            <form onSubmit={EditUser} className="form-adm">

                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">Nome*</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome completo do usuário" value={name} onChange={text => setName(text.target.value)}/>
                                    </div>

                                </div>

                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">E-mail*</label>
                                        <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail" value={email} onChange={text => setEmail(text.target.value)}/>
                                    </div>

                                </div>
                                
                                ( * )  Campo obrigatório<br /><br />

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