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

    useEffect(() => {   
        
        const getUserCount = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
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
        }
        getUserCount()
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
                    {status.type === 'error' ? <span>Sem Usuários</span> : ""}
                </Link>
    

                <div className="box box-second">
                    <span className="fas fa-truck-loading"></span>
                    <span>43</span>
                    <span>Entregas</span>
                </div>

                <div className="box box-third">
                    <span className="fas fa-check-circle"></span>
                    <span>12</span>
                    <span>Completas</span>
                </div>

                <div className="box box-fourth">
                    <span className="fas fa-exclamation-triangle"></span>
                    <span>3</span>
                    <span>Alertas</span>
                </div>
            </div>
        </div>
            </div>
        </div>
    );
}