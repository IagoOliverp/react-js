import React, { useContext, useState } from 'react';
import { Context } from '../../Context/AuthContext';

export const Navbar = () => {
    
    const { handleLogout } = useContext(Context);

    const [ image ] = useState(localStorage.getItem('image'));
    const [ name ] = useState(localStorage.getItem('name'));

    const dropdownUserNavbar = async () => {
        document.getElementById("dropNavbarUser").classList.toggle("dropdown-menu-action");
    }

    return (
        <nav className="navbar">
        <div className="navbar-content">
            <div className="bars">
                <i className="fas fa-bars"></i>
            </div>
            <img src= "logo_imagem.png" alt="fkl" className="logo"/>
        </div>
        
        <div className="navbar-content">
            <div className="avatar">
                <span onClick={() => dropdownUserNavbar()} className="drop-nav-bar-user">
                    <img src= { image } alt= { name } />
                </span>
                <div id= "dropNavbarUser" className="dropdown-menu setting">
                    <div className="item">
                        <span className="fas fa-user"></span> Perfil
                    </div>
                    <div className="item">
                        <span className="fas fa-cog"></span> Configuração
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