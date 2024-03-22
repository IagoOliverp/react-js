import React, { useEffect, useState } from 'react';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';
import { Link } from 'react-router-dom';


export const Dashboard = () => {

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const [newTickets, setNewTickets] = useState({
        type: '',
        results: ''
    })

    const [pgsTickets, setPgsTickets] = useState({
        type: '',
        results: ''
    })

    const [endTickets, setEndTickets] = useState({
        type: '',
        results: ''
    })

    useEffect(() => {   
        
        const getDashboardCount = async () => {

            const headers = {
                    'headers': {
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/dashboard", headers)
            .then((response) => {
                setStatus({
                    type: 'success',
                    mensagem: response.data.count
                })
            }).catch((err) => {
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
            })

            await api.get("/dashboard-new-tickets", headers)
            .then((response) => {
                setNewTickets({
                    type: 'success',
                    results: response.data.count
                })
            }).catch((err) => {
                setNewTickets({
                    type: 'error',
                    results: err.response.data.mensagem
                })
            })

            await api.get("/dashboard-pgs-tickets", headers)
            .then((response) => {
                setPgsTickets({
                    type: 'success',
                    results: response.data.count
                })
            }).catch((err) => {
                setPgsTickets({
                    type: 'error',
                    results: err.response.data.mensagem
                })
            })

            await api.get("/dashboard-end-tickets", headers)
            .then((response) => {
                setEndTickets({
                    type: 'success',
                    results: response.data.count
                })
            }).catch((err) => {
                setEndTickets({
                    type: 'error',
                    results: err.response.data.mensagem
                })
            })
        }
        getDashboardCount()
    },[])

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="dashboard"/>

                <div className="wrapper">
                    
                    <div className="row">
                        <Link to="/users" className="box box-first">
                            <span className="fas fa-users"></span>
                            {status.type === 'success' ? <span>{status.mensagem}</span> : ""}
                            {status.type === 'success' ? <span>Usuários</span> : ""} 
                        </Link>
            
                        <Link to="/list-new-tickets" className="box box-second">
                            <span className="icon fas fa-plus"></span>
                            {newTickets.type === 'success' ? <span>{newTickets.results}</span> : ""}
                            {newTickets.type === 'success' ? <span>Novos</span> : ""} 
                        </Link>

                        <Link to="/list-pgs-tickets" className="box box-third">
                            <span className="fas fa-exclamation-triangle"></span>
                            {pgsTickets.type === 'success' ? <span>{pgsTickets.results}</span> : ""}
                            {pgsTickets.type === 'success' ? <span>Em andamento</span> : ""} 
                        </Link>

                        <Link to="/list-end-tickets" className="box box-fourth">
                            <span className="fas fa-check-circle"></span>
                            {endTickets.type === 'success' ? <span>{endTickets.results}</span> : ""}
                            {endTickets.type === 'success' ? <span>Atendidos</span> : ""} 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}