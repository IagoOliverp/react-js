import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import api from '../../config/configApi';
import { useParams, Link, Navigate } from "react-router-dom";
import { servDeleteTicket  } from "../../services/ServDeleteTicket";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ViewTicket = (props) => {

    const { id } = useParams();

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const [data, setData] = useState('');

    const [status_ticket, setStatus_ticket] = useState({
        status_chamado: data.status_chamado
    });

    useEffect(() => {

        const getTicket = async () => {

            const headers = {
                'headers': {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/view-ticket/" + id, headers)
            .then((response) => {
                if(response){
                    setData(response.data.chamado)
                }else{
                    setStatus({
                        type: "redError",
                        mensagem: "Chamado não encontrado!"
                    })
                }
            }).catch((err) => {
                if(err.response){
                    setStatus({
                        type: "error",
                        mensagem: err.response.data.mensagem
                    })
                } else{
                    setStatus({
                        type: "error",
                        mensagem: "Erro: Tente mais tarde"
                    })   
                }   
            })
        }
    getTicket();
    
}, [id])

    const valueInput = e => setStatus_ticket({...status_ticket, [e.target.name]: e.target.value});

    const editStatus = async e => {
        e.preventDefault()

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        if(!(await validate())) return;

        await api.put("/edit-ticket-status/" + id, status_ticket, {headers})
        .then((response) => {
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            })
        }).catch((err) => {
            if(err){
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

        const deleteTicket = async (idTicket) => {
            const response = await servDeleteTicket(idTicket);
    
            if (response) {
                if (response.type === "success") {
                    setStatus({
                        type: "success",
                        mensagem: response.mensagem
                    });
                } else {
                    setStatus({
                        type: response.type,
                        mensagem: response.mensagem
                    });
                }
            } else {
                setStatus({
                    type: "redError",
                    mensagem: "Erro: Tente mais tarde!"
                });
            }
        }
        function validate(){
            if(status_ticket.status_chamado === null) return setStatus({
                type: "redError",
                mensagem: "Preencha os campos corretamente!"
            })
    
            return true;
        }

    const mensagemAdd = {
        type: 'success',
        mensagem: status.mensagem,
    }
            
    return (
        <div>
           <Navbar />
           <div className="content">
                <Sidebar active="list-tickets"/>

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Visualizar chamado</span>

                            <div className="top-content-adm-right">
                                <Link to="/list-tickets"><button type="button" className="btn-primary">Listar chamados</button></Link>
                            </div>
                        </div>

                        <div className="content-adm">
                            <div className="alert-content-adm">
                                {status.type === "success" ? <Navigate to="/list-tickets" state={mensagemAdd} />: ""}
                                {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            </div>

                            <form onSubmit={editStatus} className="form-adm">
    
                                <div className="row-input">
                                    <div className="column">
                                        <span className="title-desc">Id: </span>
                                        <span className="info-desc">{data.id}</span>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Nome: </span>
                                            <span className="info-desc">{data.nome_usuario}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Contato Celular: </span>
                                            <span className="info-desc">{data.contato_celular}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">E-mail: </span>
                                            <span className="info-desc">{data.email}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Departamento: </span>
                                            <span className="info-desc">{data.localizacao}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Tipo: </span>
                                            <span className="info-desc">{data.tipo}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Categoria: </span>
                                            <span className="info-desc">{data.categoria}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Título: </span>
                                            <span className="info-desc">{data.titulo_chamado}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Descrição: </span>
                                            <span className="info-desc">{data.descricao_problema}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Prioridade: </span>
                                            {data.prioridade === 'Alta' ? <span className="info-desc"><i className="fas fa-exclamation" style={{color: "#ff1900"}}></i> <span>Alta</span> </span> : ""}
                                            {data.prioridade === 'Média' ? <span className="info-desc"><i className="fas fa-exclamation" style={{color: "#ff8800"}}></i> <span>Média</span> </span> : ""}
                                            {data.prioridade === 'Baixa' ? <span className="info-desc"><i className="fas fa-exclamation" style={{color: "000000"}}></i> <span>Baixa</span> </span> : ""}
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <div className="info-ticket">
                                            <span className="title-desc">Status: </span>
                                            {data.status_chamado === 'Novo' ? <span className="info-desc"><i className="fas fa-circle" style={{color: "#00ff04"}}></i> <span>Novo</span> </span> : ""}
                                            {data.status_chamado === 'Em andamento' ? <span className="info-desc"><i className="fas fa-circle" style={{color: "#ff8800"}}></i> <span>Em andamento</span> </span> : ""}
                                            {data.status_chamado === 'Atendido' ? <span className="info-desc"><i className="fas fa-circle" style={{color: "000000"}}></i> <span>Atendido</span> </span> : ""}

                                            <select id="status_chamado" name="status_chamado" className="input-option" onChange={valueInput} defaultValue={status_ticket} >
                                                <option></option>
                                                <option>Em andamento</option>
                                                <option>Atendido</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row-input">
                                    <div className="column">
                                        <span className="title-desc">Criado em: </span>
                                        <span className="info-desc">{data.createdAt}</span>
                                    </div>
                                </div>
                                <div className="row-btn-ticket">
                                    <button type="submit" className="btn-success">Salvar</button>{" "}
                                    <button type="button" className="btn-danger" onClick={() => deleteTicket(data.id)}>Excluir</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )

}