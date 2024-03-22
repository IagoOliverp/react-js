import React, { useEffect,useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';
import {Link, useLocation} from 'react-router-dom';
import { servDeleteUser  } from '../../services/ServDeleteUser';
import useDropdownList from '../../hooks/useDropdownList';

export const Users = () => {

    const { actionDropdown, closeDropdownAction} = useDropdownList(); 

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
           <div>
             <Navbar />
            <div className="content">
                <Sidebar active="users" />

            <div className="wrapper">
                <div className="row">
                    <div className="top-content-adm">
                    <span className="title-content">Listar Usuários</span>
                    <div className="top-content-adm-right">
                        <Link to="/add-user"><button type="button" className="btn-success">Cadastrar</button></Link>
                        
                        </div>
                    </div>

                    <div className="alert-content-adm">
                        {status.type === "success" ? <p className="alert-success">{status.mensagem}</p> : ""}
                        {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                    </div>

                    <table className="table-list">
                    <thead className="list-head">
                        <tr>
                            <th className="list-head-content">ID</th>
                            <th className="list-head-content">Nome</th>
                            <th className="list-head-content table-sm-none">E-mail</th>
                            <th className="list-head-content">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(user => (
                            <tr key={user.id}>
                            <td className="list-body-content">{user.id}</td>
                            <td className="list-body-content">{user.name}</td>
                            <td className="list-body-content table-sm-none">{user.email}</td>
                            <td className="list-body-content">
                                <div className="dropdown-action">
                                    <button onClick={() => {closeDropdownAction(); actionDropdown(user.id)}} className="dropdown-btn-action">Ações</button>
                                    <div id={"actionDropdown" + user.id} className="dropdown-action-item">
                                        <Link to={"/view-user/" + user.id}>Visualizar</Link>
                                        <Link to={"/edit-user/" + user.id}>Editar</Link>
                                        <Link to={"#"} onClick={() => deleteUser(user.id)}>Apagar</Link><br />
                                    </div>
                                </div>
                            </td>
                            <hr />
                        </tr>
                    ))}
                    </tbody>
                    </table>

                    <div className="content-pagination">
                    <div className="pagination">
                        <Link to="#" onClick={() => getUsers(1)}><i className="fas fa-angle-double-left"></i></Link>
                        
                        {page !== 1 ? <Link to="#" onClick={() => getUsers(page - 1)}>{page - 1}</Link> : ""}{" "}

                        <Link to="#" className="active">{page}</Link>

                        {page + 1 <= lastPage ? <Link to="#" onClick={() => getUsers(page + 1)}>{page + 1}</Link> : ""}{" "}
        
                        <Link to="#" onClick={() => getUsers(lastPage)}><i className="fas fa-angle-double-right"></i></Link>
                    </div>
                </div>
                
                </div>
            </div>
            
            </div>
        </div>
    )
}