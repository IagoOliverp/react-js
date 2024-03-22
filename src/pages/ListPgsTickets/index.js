import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import useDropdownList from "../../hooks/useDropdownList";
import api from "../../config/configApi";

export const ListPgsTickets = () => {

    const { state } = useLocation();

    const { actionDropdown, closeDropdownAction} = useDropdownList(); 

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    })

    const [page, setPage] = useState('');
    const [lastPage, setLastPage] = useState('');

    const getTickets = async (page) => {

        if(page === undefined){
            page = 1;
        }

        setPage(page)

        const headers = {
            'headers': {
                'Content-Type':'application/json',
                'Authorization':'Bearer' + localStorage.getItem('token')
            }
        }

        await api.get("/list-pgs-tickets/" + page, headers)
        .then((response) => {
            setData(response.data.chamado);
            setLastPage(response.data.lastPage);
        }).catch((err) => {
            if(err.response) {
                setStatus({
                    type: "error",
                    mensagem: err.response.data.mensagem
                })
            } else{
                setStatus({
                    type: "error",
                    mensagem: "Tente novamente mais tarde!"
                })
            }
        })
    }

    useEffect(() => {
        getTickets()
    },[])

    return (
        <div>
             <Navbar />
            <div className="content">
                <Sidebar active="list-tickets"/>

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Lista de chamados em andamento</span>
                            <div class="top-content-adm-right">
                                <Link to="/list-tickets"><button type="button" class="btn-primary">Listar chamados</button></Link>
                            </div>
                        </div>
                        <div className="alert-content-adm">
                            {status.type === "success" ? <p className="alert-success">{status.mensagem}</p> : ""}
                            {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>
                        <div className="content-adm">

                            <table className="table-list">
                            <thead className="list-head">
                                <tr>
                                    <th className="list-head-content">ID</th>
                                    <th className="list-head-content table-sm-none">Nome Usuário</th>
                                    <th className="list-head-content">Departamento</th>
                                    <th className="list-head-content">Tipo</th>
                                    <th className="list-head-content">Categoria</th>
                                    <th className="list-head-content">Título</th>
                                    <th className="list-head-content table-sm-none">Prioridade</th>
                                    <th className="list-head-content">Status</th>
                                    <th className="list-head-content">Aberto em</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(chamado => (
                                    <tr key={chamado.id}>
                                        <td className="list-body-content">{chamado.id}</td>
                                        <td className="list-body-content table-sm-none">{chamado.nome_usuario}</td>
                                        <td className="list-body-content">{chamado.localizacao}</td>
                                        <td className="list-body-content">{chamado.tipo}</td>
                                        <td className="list-body-content">{chamado.categoria}</td>
                                        <td className="list-body-content">{chamado.titulo_chamado}</td>
                                        <td className="list-body-content table-sm-none">{chamado.prioridade}</td>
                                        {chamado.status_chamado === "Novo" ? <td className="list-body-content status-new">{chamado.status_chamado}</td> : ""}
                                        {chamado.status_chamado === "Em andamento" ? <td className="list-body-content status-working">{chamado.status_chamado}</td> : ""}
                                        {chamado.status_chamado === "Atendido" ? <td className="list-body-content status-finished">{chamado.status_chamado}</td> : ""}
                                        <td className="list-body-content">{chamado.createdAt}</td>
                                        <td className="list-body-content">
                                            <div className="dropdown-action">
                                                <button onClick={() => {closeDropdownAction(); actionDropdown(chamado.id)}} className="dropdown-btn-action">Ações</button>
                                                <div id= {"actionDropdown" + chamado.id} className="dropdown-action-item">
                                                    <Link to={"/view-ticket/" + chamado.id}>Visualizar</Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                            </table>

                            <div className="content-pagination">
                                <div className="pagination">
                                    <Link to="#" onClick={() => getTickets(1)}><i className="fas fa-angle-double-left"></i></Link>
                            
                                    {page !== 1 ? <Link to="#" onClick={() => getTickets(page - 1)}>{page - 1}</Link> : ""}{" "}

                                    <Link to="#" className="active">{page}</Link>

                                    {page + 1 <= lastPage ? <Link to="#" onClick={() => getTickets(page + 1)}>{page + 1}</Link> : ""}{" "}
                    
                                    <Link to="#" onClick={() => getTickets(lastPage)}><i className="fas fa-angle-double-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}