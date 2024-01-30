import React, { useEffect,useState } from 'react';
import { Menu  } from '../../components/Menu';
import api from '../../config/configApi';
import {Link, useLocation} from 'react-router-dom';
import { servDeleteUser  } from '../../services/ServDeleteUser';

export const Users = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getUsers = async (page) => {
    
        if(page === undefined){
            page = 1;
        }
        setPage(page)

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token'),
            }
        }
        await api.get("/Users/" + page, headers)
            .then((response) => {
                setData(response.data.users)
                setLastPage(response.data.lastPage);
                console.log(response)
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type:'error',
                        mensagem: err.response.data.mensagem
                    })
                } else {
                    setStatus({
                        type:'error',
                        mensagem: 'Erro: Tente mais tarde!'
                    });
                }
            })
    }
    useEffect(() => {
        getUsers()
    },[]);

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser)

        if(response) {
            setStatus({
                type: response.type,
                mensagem: response.mensagem
            })
            getUsers();
        } else{
            setStatus({
                type: "error",
                mensagem: "Erro: tente mais tarde!"
            })
        }

        /*const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token'),
            }
        }
        
        await api.delete("/user/" + idUser, headers)
        .then((response) => {
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            })
            getUsers()
        }).catch ((err) => {
            if(err.response) {
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
            }else {
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                })
            }
        });*/
    }

    return (
        <>
            <Menu />
            
            <h1> Listar Usuários </h1>

            <Link to="/add-user"><button type="button">Cadastrar</button></Link><br /><hr />

            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p style={{color: "green"}}>{status.mensagem}</p> : ""}

            {data.map(user => (
                <div key={user.id}>
                    <span>{user.id}</span><br/>
                    <span>{user.name}</span><br/>
                    <span>{user.email}</span><br/><br />
                    <Link to={"/view-user/" + user.id}><button type="button">Visualizar</button></Link>{" "}
                    <Link to={"/edit-user/" + user.id}><button type="button">Editar</button></Link>{" "}
                    <Link to={"#"}><button type="button" onClick={() => deleteUser(user.id)}>Apagar</button></Link><br /><hr />
                </div>
            ))}

        
        {page !== 1 ? <button type="button" onClick={() => getUsers(1)}>Primeira</button> : <button type="button" disabled>Primeira</button>}{" "} 

        {page !== 1 ? <button type="button" onClick={() => getUsers(page - 1)}>{page - 1}</button> : ""}{" "}

        <button type="button" disabled="on">{page}</button>{" "}

        {page + 1 <= lastPage ? <button type="button" onClick={() => getUsers(page + 1)}>{page + 1}</button> : ""}{" "}

        {page !== lastPage ? <button type="button" onClick={() => getUsers(lastPage)}>Última</button> : <button type="button" disabled>Última</button>}
        </>
    )
}