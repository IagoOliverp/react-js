import React, { useState } from "react";
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';
/*import * as yup from 'yup';*/
import { Link, Navigate } from 'react-router-dom';

export const Adduser = () => {


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

    const addUser = async e => {
        e.preventDefault();

         const headers = {
                'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        if(!(await validate())) return;

        await api.post("/user", user, {headers})
        .then((response) => {
            setStatus({
                type:'success',
                mensagem: response.data.mensagem
            })
        }).catch((err) => {
            if (err.response) {
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
            } else {
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente novamente!"
                })
            }
        })
    }

    function validate(){
        if(!user.name) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo nome!'});
        if(!user.email) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo e-mail!'});
        if(!user.password) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo senha!'});
        if(user.password.lengh < 6 ) return setStatus({type: 'error', mensagem: 'Erro: A senha deve ter no mínimo 6 caracteres!'})

        return true;
    }

    /*(Utilizando o Yup para validação dos campos)
    async function validate() {
        let schema = yup.object().shape({
            name: yup.string("Erro: Necessário preencher o campo nome 4!").required("Erro: Necessário preencher o campo 4!")
        })

        try {
            await schema.validate({
                name: user.name,
                email: user.email,
                password: user.password
            });
            return true
        } catch (err) {
            setStatus({
                type: 'error',
                mensagem: err.errors
            });
            return false;
        }
    }*/

    const mensagemAdd = {
        type: status.type,
        mensagem: status.mensagem
    }

    return (
        <div>
        <Navbar />
            <div className="content">
                <Sidebar active="users" />

                <div class="wrapper">
                    <div class="row">
                        <div class="top-content-adm">
                            <span class="title-content">Cadastrar Usuário</span>
                            <div class="top-content-adm-right">
                            <Link to="/users"><button type="button" class="btn-primary">Listar</button></Link>
                                
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === "success" ? <Navigate to="/users" state={mensagemAdd}/> : ""}
                            {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">

                            <form onSubmit={addUser} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Nome</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome completo do usuário" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">E-mail</label>
                                        <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail" onChange={valueInput}/>
                                    </div>

                                    <div class="column">
                                        <label className="title-input">Senha</label>
                                        <input type="password" name="password" id="password" className="input-adm" placeholder="Senha de acesso ao sistema" autoComplete="on" onChange={valueInput}/>
                                    </div>

                                </div>

                                <button type="submit" className="btn-success">Cadastrar</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};