import React, { useContext, useState } from 'react';
import { Context } from '../../Context/AuthContext';
import {Link} from 'react-router-dom';

export const Navbar = () => {

    const { handleLogout } = useContext(Context);

    const [ image ] = useState(localStorage.getItem('image'));
    const [ name ] = useState(localStorage.getItem('name'));

    const dropdownUserNavbar = async () => {
        document.getElementById("dropNavbarUser").classList.toggle("dropdown-menu-action");
    }

    const barsSidebar = async () => {
        document.getElementById("barsSidebar").classList.toggle("sidebar-active");
    }


    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="bars" onClick={() => barsSidebar()}>
                    <i className="fas fa-bars"></i>
                </div>
                <Link to="/dashboard">
                    <img src= "/logo_usersave.ico" alt="UserSave" className="logo"/>
                </Link>
                
            </div>
        
            <div className="navbar-content">
                <div className="avatar">
                    <span onClick={() => dropdownUserNavbar()} className="drop-nav-bar-user">
                        <img src= { image } alt= { name } />
                    </span>
                    <div id="dropNavbarUser" className="dropdown-menu setting">

                    <div className="item">
                        <Link to="/view-profile">
                            <span className="fas fa-user"/> Perfil 
                        </Link>
                    </div>

                    <div className="item" onClick={handleLogout}>
                        <span className="fas fa-sign-out-alt"></span> Sair
                    </div>
                </div>
            </div>
        </div>
    </nav>
    )
}