import React, { useEffect, useState }from "react";
import { Link, Navigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import api from "../../config/configApi";

export const Addticket = () => {
    
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const [name, setName] = useState('')

    const [ticket, setTicket] = useState({
        nome_solicitante: '',
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
        const Nameprofile = () => {

            const requerente = localStorage.getItem('name');

            setName(requerente)

            console.log(requerente)

        } 
        Nameprofile();
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

        await api.post("/add-chamado", ticket, {headers})
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

    const mensagemAdd = {
        type: 'success',
        mensagem: status.mensagem
    }
    
    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="add-ticket"/>

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
                                <label className="title-adm">Requerente: </label>
                                <input id="nome_solicitante" name="nome_solicitante" type="text" className="input-adm" value={name} onChange={valueInput}/>
                            </div>
                        </div>

                        <div className="row-input">
                            <div className="column">
                                <label className="title-adm">Contato celular</label>
                                <input id="contato_celular" name="contato_celular" type="text" className="input-adm" onChange={valueInput}/>
                            </div>
                        </div>

                        <div className="row-input">
                            <div className="column">
                                <label className="title-adm">Contato E-mail</label>
                                <input id="email" name="email" type="email"className="input-adm" onChange={valueInput}/>
                            </div>
                        </div>

                        <div className="row-input">
                                <div className="column">
                                    <label className="title-adm">Localização</label>
                                    <input id="localizacao" name="localizacao" type="text" className="input-adm" placeholder="Digite o titulo do chamado" onChange={valueInput} required/>
                                </div>
                            </div>

                            <label for="opcoes_tipo">Selecione o tipo: </label>
                            <select id="opcoes_tipo" name="tipo" onChange={valueInput}>
                                <option >---</option>
                                <option >Incidente</option>
                                <option >Requisição</option>
                            </select> <br /><br />

                            <label for="opcoes_categoria">Selecione a categoria: </label>
                            <select id="opcoes_categoria" name="categoria" onChange={valueInput}>
                                <option >---</option>
                                <option >E-mail</option>
                                <option >Senha</option>
                                <option >Conexão</option>
                                <option >Impressora</option>
                            </select> <br /><br />

                            <label for="opcoes_prioridade">Selecione a prioridade: </label>
                            <select id="opcoes_prioridade" name="prioridade" onChange={valueInput}>
                                <option >---</option>
                                <option >Alta</option>
                                <option >Média</option>
                                <option >Baixa</option>
                            </select> <br /><br />

                            <div className="row-input">
                                <div className="column">
                                    <label className="title-adm">Título</label>
                                    <input type="text" id="titulo_chamado" name="titulo_chamado" className="input-adm" placeholder="Descreva o problema" onChange={valueInput}/>
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



