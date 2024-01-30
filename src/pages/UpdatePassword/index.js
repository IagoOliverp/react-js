import React, { useEffect, useState } from 'react';
import api from '../../config/configApi';
import * as yup from 'yup';
import { Navigate, useParams, Link } from 'react-router-dom';
 
export const UpdatePassword = (props) => {

    const {key} = useParams()
    
    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    })

    const [password, setPassword] = useState("");

    useEffect(() => {

        const valkey = async () => {
            const headers = {
                'headers': {
                    'Content-Type': 'application/json'
                }
            }

            await api.get("val-key-recover-pass/" + key, headers)
            .then((response) => {
                /*setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                })*/
            }).catch((err) => {
                if(err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    })
                } else {
                    setStatus({
                        type: 'redDanger',
                        mensagem: "Erro: Tente novamente!"
                    })
                }
            });

        }
        valkey();
    },[key]);

    const updatePassword = async e => {
        e.preventDefault();

        if (!await(validate())) return;
        
        const headers = {
            'headers': {
            'Content-Type':'application/json',
        }
    }

        await api.put("/update-password/" + key, {password}, headers)

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

    async function validate() {
        let schema = yup.object().shape({
            password: yup.string("Erro: Necessário preencher o campo senha!").required("Erro: Necessário preencher o campo senha!").min(6, "Erro: A senha deve ter no mínimo 6 caracteres!")
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
        type: status.type,
        mensagem: status.mensagem
    }

    const mensagemAdd2 = {
        type: 'success',
        mensagem: status.mensagem
    }

    return (
        <div>
            <h1>Editar a Senha</h1>

            {status.type === 'redDanger' ? <Navigate to={"/"} state={mensagemAdd}/> : ""}
            {status.type === 'redSuccess' ? <Navigate to={"/"} state={mensagemAdd2}/> : ""}
            {status.type === 'error' ? <Navigate to={"/"} state={mensagemAdd}/> : ""}
            {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}

            <form onSubmit={updatePassword}>

                <label>Senha:* </label>
                <input type="password" name="password" placeholder="Digite a sua Senha" autoComplete="on" onChange={text => setPassword(text.target.value)}></input><br />

                <p>*Campo obrigatório</p>
                
                <button type="submit">Salvar</button><br /><br />
                Lembrou a Senha? <Link to="/">Clique aqui</Link>
            </form>
        </div>
    );
}