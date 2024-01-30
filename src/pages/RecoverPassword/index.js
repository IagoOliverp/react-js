import React, { useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import api from '../../config/configApi';


export const RecoverPassword = () => {

    const [user, setUser] = useState({
        email: "",
        url: "http://localhost:3000/update-password/"
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: '',
        loading: false
    });

    const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

    const recoverPass = async e => {
        e.preventDefault();

        setStatus({
            loading: true
        });

        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post("/recover-password", user, headers ) 

            .then((response) => {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.data.mensagem,
                    loading: false
                });
            }).catch((err) => {
                if (err.response){
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem,
                        loading: false,
                    });
                } else{
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: tente mais tarde!",
                        loading: false
                    })
                }
                });
            
}

const mensagemAdd = {
    type: 'success',
    mensagem: status.mensagem
}

    return (
        <div>
            <h1>Recuperar Senha</h1>

            {status.type === 'error' ? <p style= {{color: "#ff0000"}}>{status.mensagem}</p> : "" }
            {status.type ==='success' ? <p style= {{color: "green"}}>{status.mensagem}</p> : ""}
            {status.type ==='redSuccess' ? <Navigate to="/" state={mensagemAdd}/> : ""}

            <form onSubmit={recoverPass}>
                <label>E-mail: </label>
                <input type="email" name="email" placeholder="Digite o e-mail" onChange={valueInput}></input><br /><br />
                
                {status.loading ? <button type="submit" disabled>Enviando...</button> : <button type="submit">Enviar</button>}<br /><br />

            </form>
            <Link to="/add-user-login">Cadastre-se</Link>{" "}
                - Lembrou a Senha? <Link to="/">Clique aqui</Link>

        </div>
    );
};