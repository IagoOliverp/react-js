import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

export const ListTickets = () => {

    const { state } = useLocation()

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    })


    return (
        <div>
            <div className="alert-content-adm">
                {status.type === "success" ? <p className="alert-success">{status.mensagem}</p> : ""}
                {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
            </div>

            <Navbar />
            <div className="content">
                <Sidebar active="list-tickets"/>

                <div className="wrapper">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Lista de chamados </span>
                            <div className="top-content-adm-right">
                        
                            </div>
                        </div>
                        <div className="alert-content-adm">
                            
                        </div>
                    <div className="content-adm">

                        

                    </div>

                    </div>

                </div>
            </div>
        </div>
    )
}