import React, {useState} from 'react';
import api from '../../config/configApi'; //Configurar a conexão com a API
import { Link, Navigate } from 'react-router-dom'; //Redirecionar para outra rota


export const AddUserLogin = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

    const addUser = async e => {
        e.preventDefault()

        if(!(await validate())) return;

        const headers = {
            'headers' : {
                'Content-Type': 'application/json',
            }
        };

        await api.post("/update-password", user, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                });
            }).catch((err) => {
                if(err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    })
                }else{
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente novamente mais Tarde!"
                   })
                }
            })


    }

    function validate() {
        if(!user.name) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o campo!'});
        if(!user.email) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o e-mail!'});
        if(!user.password) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o senha!'});
        if(user.password.lengh < 6 ) return setStatus({type: 'error', mensagem: 'Erro: A senha deve ter no mínimo 6 caracteres!'});

        return true;
    }

    const mensagemAdd = {
        type: status.type,
        mensagem: status.mensagem
    }

   
    return (//Formulário de login do usuário
        <div>
            <h1>Cadastrar Usuário</h1> 
            
            {status.type === 'error'? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : " "}
            {status.type === 'success'? <Navigate to="/" state={mensagemAdd} />: ""}
            
            <form onSubmit={addUser}>
                <label>Nome:* </label>
                <input type="text" name="name" placeholder="Digite o seu Nome" onChange={valueInput}></input><br /><br />

                <label>E-mail:* </label>
                <input type="email" name="email" placeholder="Digite o seu E-mail" autoComplete="on" onChange={valueInput}></input><br /><br />

                <label>Senha:* </label>
                <input type="password" name="password" placeholder="Digite a sua Senha" autoComplete="on" onChange={valueInput}></input><br /><br />

                <p>*Campo obrigatório</p>
                
                <button type="submit">Cadastrar</button><br /><br />
                <Link to="/">Acessar</Link>
            </form>
        </div>
    );
};