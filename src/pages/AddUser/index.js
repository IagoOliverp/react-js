import React, { useState } from "react";
import {Menu}  from '../../components/Menu';
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
        };

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
        if(!user.name) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o campo 1!'});
        if(!user.email) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o e-mail 1!'});
        if(!user.password) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o senha 1!'})
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
            <Menu />

            <h1>Cadastrar usuário</h1>
            <Link to="/users"><button type="button">Listar</button></Link><br /><hr/>
           
            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <Navigate to="/users" state={mensagemAdd}/> : ""}
            

            <form onSubmit={addUser}>
                <label>Nome*: </label>
                <input type="text" name="name" placeholder="Nome Completo do Usuário" onChange={valueInput}/><br /><br />

                <label>E-mail*: </label>
                <input type="email" name="email" placeholder="Email do Usuário" onChange={valueInput}/><br /><br />

                <label>Senha*: </label>
                <input type="password" name="password" placeholder="Senha do Usuário" autoComplete="on" onChange={valueInput}/><br /><br />

                * Campo obrigatório <br /><br />

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
};