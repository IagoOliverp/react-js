import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import {Link} from 'react-router-dom';

export const Sidebar = () => {
    
    const { handleLogout } = useContext(Context);

    /*const dropdownUserNavbar = async () => {
        document.getElementById("dropNavbarUser").classList.toggle("dropdown-menu-action");
    }*/

    return (
        <div className="sidebar">
            <Link href="index.html" className="sidebar-nav active"><i class="icon fas fa-tachometer-alt"></i><span>Dashboard</span></Link>

            <Link href="listar.html" className="sidebar-nav"><i class="icon fas fa-users"></i><span>Usuários</span></Link>

            <Link href="visualizar.html" className="sidebar-nav"><i class="icon fas fa-eye"></i><span>Perfil</span></Link>

            <Link onClick={handleLogout} className="sidebar-nav"><i class="icon fas fa-sign-out-alt"></i><span>Sair</span></Link>
        </div>
    )
}