import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import {Link} from 'react-router-dom';

export const Sidebar = (props) => {
    
    const { handleLogout } = useContext(Context);

    /*const dropdownUserNavbar = async () => {
        document.getElementById("dropNavbarUser").classList.toggle("dropdown-menu-action");
    }*/

    return (
        <div id="barsSidebar" className="sidebar">
            <Link to="/dashboard" className={props.active === "dashboard" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-tachometer-alt"></i><span>Dashboard</span></Link>

            <Link to="/add-ticket" className={props.active === "add-ticket" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-plus"></i><span>Abrir chamado</span></Link>

            <Link to="/list-tickets" className={props.active === "list-tickets" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-list"></i><span>Listar chamados</span></Link>

            <Link to="/users" className={props.active === "users" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-users"></i><span>Usuários</span></Link>

            <Link to="/view-profile"className={props.active === "profile" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-eye"></i><span>Perfil</span></Link>

            <Link to="#" onClick={handleLogout} className="sidebar-nav"><i className="icon fas fa-sign-out-alt"></i><span>Sair</span></Link>
        </div>
    )
}