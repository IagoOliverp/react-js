import React, { useEffect, useState }from "react";
import { Navbar } from "../../components/Navbar";
import {Navigate} from 'react-router-dom';
import { Sidebar } from "../../components/Sidebar";
import api from "../../config/configApi";

export const Addticket = () => {
    
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const [ticket, setTicket] = useState({
        id_usuario: '',
        nome_usuario: '',
        contato_celular: '',
        email: '',
        localizacao: '',
        tipo: '',
        categoria: '',
        titulo_chamado: '',
        descricao_problema: '',
        prioridade: '',
    })

    useEffect(() => {
        const idUsuario = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
            
            await api.get("/get-user-profile-name", headers)

            .then((response) => {
                setTicket({
                    id_usuario: response.data.id,
                    nome_usuario: response.data.mensagem
                })
            }).catch((err) => {
                setStatus({
                    type: "error",
                    mensagem: err.response.data.mensagem
                })
            })
        }
        idUsuario()
    }, [])

    const valueInput = e => setTicket({...ticket, [e.target.name]: e.target.value});

    const Addticket = async e => {
        e.preventDefault();

         const headers = {
                'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        if(!(await validate())) return;

        await api.post("/add-ticket", ticket, headers)
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
        if(!(ticket.contato_celular || ticket.contato_email)) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher um contato ao menos!'});
        if(!ticket.localizacao) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo localização!'});
        if(!ticket.tipo) return setStatus({type: 'error', mensagem: 'Erro: Necessário selecionar o tipo!'});
        if(!ticket.categoria) return setStatus({type: 'error', mensagem: 'Erro: Necessário selecionar categoria!'});
        if(!ticket.prioridade) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo prioridade!'});
        if(!ticket.titulo_chamado) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo título!'});
        if(!ticket.descricao_problema) return setStatus({type: 'error', mensagem: 'Erro: Necessário preencher o campo descrição!'});

        return true;
    }

    const mensagemAdd = {
        type: status.type,
        mensagem: status.mensagem
    }
    
    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="add-ticket" />

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Abrir chamado</span>
                            <div className="top-content-adm-right">
                        
                            </div>
                        </div>
                        <div className="alert-content-adm">
                            {status.type === "success" ? <Navigate to="/list-tickets" state= {mensagemAdd}/> : ""}
                            {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>
                    <div className="content-adm">

                        <form onSubmit={Addticket} className="form-adm">

                        <div className="row-input">
                            <div className="column">
                                <span className="title-desc">Id usuário: </span>
                                <span className="info-desc">{ticket.id_usuario}</span>
                            </div>
                        </div>

                        <div className="row-input">
                            <div className="column">
                                <span className="title-desc">Nome Usuário: </span>
                                <span className="info-desc">{ticket.nome_usuario}</span>
                            </div>
                        </div>

                        <div className="row-input">
                            <div className="column">
                                <label className="title-adm">Contato celular</label>
                                <input id="contato_celular" name="contato_celular" type="text" className="input-adm" placeholder="Digite o número para contato" onChange={valueInput}/>
                            </div>
                        </div>

                        <div className="row-input">
                            <div className="column">
                                <label className="title-adm">Contato E-mail</label>
                                <input id="email" name="email" type="email"className="input-adm" placeholder="Digite o e-mail para contato" onChange={valueInput}/>
                            </div>
                        </div>

                        <div className="row-input">
                                <div className="column">
                                    <label className="title-adm">Departamento</label>
                                    <input id="localizacao" name="localizacao" type="text" className="input-adm" placeholder="Digite o departamento" onChange={valueInput} required/>
                                </div>
                            </div>

                            <label for="opcoes_tipo">Selecione o tipo: </label>
                            <select id="opcoes_tipo" name="tipo" className="input-option" onChange={valueInput}>
                                <option ></option>
                                <option >Incidente</option>
                                <option >Requisição</option>
                            </select> <br /><br />

                            <label for="opcoes_categoria">Selecione a categoria: </label>
                            <select id="opcoes_categoria" name="categoria" className="input-option" onChange={valueInput}>
                                <option ></option>
                                <option >E-mail</option>
                                <option >Senha</option>
                                <option >Conexão</option>
                                <option >Impressora</option>
                                <option >Insulmos</option>
                            </select> <br /><br />

                            <label for="opcoes_prioridade">Selecione a prioridade: </label>
                            <select id="opcoes_prioridade" name="prioridade" className="input-option" onChange={valueInput}>
                                <option ></option>
                                <option >Alta</option>
                                <option >Média</option>
                                <option >Baixa</option>
                            </select> <br /><br />

                            <div className="row-input">
                                <div className="column">
                                    <label className="title-adm">Título</label>
                                    <input type="text" id="titulo_chamado" name="titulo_chamado" className="input-adm" placeholder="Descreva o título" onChange={valueInput}/>
                                </div>
                            </div>

                            <div className="row-input">
                                <div className="column">
                                    <label className="title-adm">Descrição</label>
                                    <textarea id="descricao_problema" name="descricao_problema" type="text" rows={15} className="input-adm" placeholder="Descreva o problema" onChange={valueInput}/>
                                </div>
                            </div>

                            <button type="submit" className="btn-success">Enviar chamado</button>{" "}
                            
                        </form>

                    </div>
                    </div>

                </div>
            </div>

        </div>
    )

}



