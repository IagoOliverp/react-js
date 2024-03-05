import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const EditProfilePassword = () => {

    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const EditUser = async e => {
        e.preventDefault();
        if (!await(validate())) return;
        
        const headers = {
            'headers': {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

        await api.put("/edit-profile-password", {password}, headers)
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

            await api.get("/view-profile", headers)

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
    },[])

    /*function validate(){
        if(!name) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o campo!'});
        if(!email) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o e-mail!'});
        if(!password) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o senha!'})
        if(password.length < 6 ) return setStatus({type: 'error', mensagem: 'Erro: A senha deve ter no mínimo 6 caracteres!'})

        return true;
    }*/

    async function validate() {
        let schema = yup.object().shape({
            password: yup.string("Erro: Necessário preencher o campo senha!").required("Erro: Necessário preencher o campo 4!").min(6, "Erro: A senha deve ter no mínimo 6 caracteres!")
        })

        try {
            await schema.validate({password})
            return true;
        } catch (err) {
            setStatus({
                type: 'error',
                mensagem: err.errors
            });
            return false;
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
                <Sidebar />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content" >Editar senha do Perfil</span>
                            <div className="top-content-adm-right">

                            <Link to="/view-profile"><button type="button" className="btn-info">Perfil</button></Link>{" "}
                           
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ? <Navigate to="/users" state={mensagemAdd}/> : ""}
                            {status.type === "redSuccess" ? <Navigate to="/view-profile" state={mensagemAdd2}/> : ""}
                            {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">

                            <form onSubmit={EditUser} className="form-adm">

                                <label>Nome: {name}</label><br /><br />
                                <label>E-mail: {email}</label><br /><br />

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Senha*</label>
                                        <input type="password" name="password" id="password" className="input-adm" placeholder="Senha do usuário" onChange={text => setPassword(text.target.value)}/>
                                    </div>
                                </div>

                                ( * )  Campo obrigatório<br /><br />

                                <button type="submit" className="btn-success">Salvar</button>{" "}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}