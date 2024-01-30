import React, { useEffect, useState } from 'react';
import { Menu } from '../../components/Menu';
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
            <Menu />

            <h1>Editar Usuário</h1>

            <Link to="/users"><button type="button">Listar</button></Link>{" "}
            <Link to={"/view-user/" + id}><button type="button">Visualizar</button></Link>{" "}
            <Link to="#"><button type="button" onClick={() => deleteUser(id)}>Apagar</button></Link>{" "}

            {status.type === 'redWarning' ? <Navigate to="/users" state={mensagemAdd}/> : ""}

            {status.type === 'redSuccess' ?  <Navigate to="/users" state={mensagemAdd2}/> : ""}

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