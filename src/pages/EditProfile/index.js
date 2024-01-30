import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
import api from '../../config/configApi';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const EditProfile = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const EditUser = async e => {
        e.preventDefault();

        if (!(await validate())) return;    

        const headers = {
            'headers': {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

        await api.put("/edit-profile", {name, email}, headers)
        .then((response) => {
            localStorage.setItem('name', name);
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
                        mensagem: 'Erro: Usuário não encontrado!'
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
                        mensagem: 'Erro: tente mais tarde!'
                    });
                }
            })
        }

        getUser();
    },[])

    function validate(){
        if(!name) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o campo!'});
        if(!email) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o e-mail!'});
        /*if(!password) return setStatus({type: 'error', mensagem: 'Erro: necessário preencher o senha!'})
        if(password.length < 6 ) return setStatus({type: 'error', mensagem: 'Erro: A senha deve ter no mínimo 6 caracteres!'})*/

        return true;
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
            <Menu />

            <h1>Editar Perfil</h1>

            <Link to="/view-profile"><button type="button">Perfil</button></Link>{" "}

            {status.type === 'redWarning' ? <Navigate to="/login" state={mensagemAdd}/> : ""}

            {status.type === 'redSuccess' ?  <Navigate to="/view-profile" state={mensagemAdd2}/> : ""}

            {status.type === 'error' ?  <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
            <hr />
            <form onSubmit={EditUser}>
                <label>Nome*: </label>
                <input type="text" name="name" placeholder="Nome completo do usuário" value={name} onChange={text => setName(text.target.value)}/><br /><br />
                <label>E-mail*: </label>
                <input type="email" name="email" placeholder="E-mail do usuário" value={email} onChange={text => setEmail(text.target.value)}/><br /><br />
                
                ( * )  Campo obrigatório<br /><br />
                
                
                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}