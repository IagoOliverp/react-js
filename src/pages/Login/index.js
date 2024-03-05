import React, {useState, useContext} from 'react';
import api from '../../config/configApi'; //Configurar a conexão com a API
import { useNavigate, useLocation, Link} from 'react-router-dom'; //Redirecionar para outra rota
import {Context} from '../../Context/AuthContext';

//Exportando componente Login
export const Login = () => {

    const { state } = useLocation();

    const navigate = useNavigate();

    const {signIn} = useContext(Context);


    const [user, setUser] = useState({ //Definindo quais valores os dados irão possuir ao iniciar o servidor com o useState
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
        loading: false
    });

    const valorInput = e => setUser({...user, [e.target.name]: e.target.value}); //Pegando os valores que estão nos inputs

    const loginSubmit = async e => { //Submetendo o Login através do evento do botão que irá bater na API com os dados dos Inputs e retornar uma resposta no console
        e.preventDefault();
        //console.log(user.password);
        setStatus({
            loading: true
        });

        const headers = {//Chamada dos headers, políticas para acesso e permissão de usuário na API
            'Content-Type': 'application/json'
        }
        
        await api.post("/login", user, {headers}) //Chamada da API com método POST que se encontra no back-end
            .then((response) => {
                //console.log(response);
                setStatus({
                    /*type: 'success',
                    mensagem: response.data.mensagem,*/
                    loading: false
                });

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('image', response.data.user.image);
                signIn(true);
                return navigate('/dashboard')

            }).catch((err) => {
                if (err.response) {
                    //console.log(err.response);
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem,
                        loading: false
                    })
                }else{
                    //console.log("Erro: tente mais tarde");
                    setStatus({
                        type: 'error',
                        mensagem: 'Erro: tente mais tarde!',
                        loading: false
                    });
                }
            });
    }

    return (//Formulário de login do usuário
        <div className="d-flex">
            <div className="container-login">
                <div className="wrapper-login">
                    <div className="title">
                        <span>Login</span> 
                    </div>
            
                            <form onSubmit={loginSubmit} class="form-login">

                            {status.type === 'redDanger' ? <p className="alert-danger">{status.mensagem}</p> : ""}

                            {status.type === 'error'? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success'? <p className="alert-success">{status.mensagem}</p> : ""}

                            {status.loading ? <p className="alert-success">Validando...</p> : ""}

                                <div className="row">
                                    <i className="fas fa-user"></i>
                                    <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput}/>
                                </div>

                                <div className="row">
                                <i className="fas fa-lock"></i>
                                    <input type="password" name="password" placeholder="Digite a senha" autoComplete="on" onChange={valorInput}/>
                                </div>
                                <div className="row button">
                                    {status.loading ? <button type="submit" className="button-login" disabled>Acessando...</button> : <button type="submit" className="button-login">Acessar</button>}{" "}
                                </div>

                                <div className="signup-link">
                                    <Link to="/add-user-login" className="link-pg-login">Cadastre-se</Link>{" - "}
                                    <Link to="/recover-password" className="link-pg-login">Esqueci a Senha</Link>
                                </div>
                                </form>
                                
                        </div>
                    </div>
                </div>
    );
};