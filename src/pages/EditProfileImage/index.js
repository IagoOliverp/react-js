import React, { useState, useEffect } from 'react';
import { Menu } from '../../components/Menu';
import { Navigate } from 'react-router-dom';
import api from '../../config/configApi';

export const EditProfileImage = () => {

    const [image, setImage] = useState('');

    const [endImg, setEndImg] = useState('');

    //const [endImg, setEndImg] = useState(localStorage.getItem('image'));

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const EditUser = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        const headers = {
                'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/edit-profile-image", formData, headers)
        .then((response) => {
            //localStorage.setItem('image', response.data.image)
            setStatus({
                type: 'redSuccess',
                mensagem: response.data.mensagem
            });
        }).catch((err) => {
            if (err.response) {
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
            } else {
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                })
            }
        })

    }

    useEffect(() => {
        const getUser = async () => {
    
            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
    
            await api.get("/view-profile", headers)
            .then((response) => {
                if (response.data.user){
                    setEndImg(response.data.endImage);
                } else {
                    setStatus({
                        type: 'redWarning',
                        mensagem: "Erro: Usuário não encontrado!"
                    });
                }
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'redWarning',
                        mensagem: err.response.data.mensagem
                    });
                }else {
                    setStatus({
                        type: 'redWarning',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            })
    
        }
        getUser()
    },[]);

    const mensagemAdd = {
        type: 'success',
        mensagem: status.mensagem
    }

    return (
        <div>
            <Menu />

            <h1>Editar Foto do Perfil</h1>

            {status.type === 'redSuccess' ? <Navigate to= "/view-profile" state={mensagemAdd}/> : ""}
            {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}

            <form onSubmit={EditUser}>
                <label>Imagem*: </label>
                    <input type="file" name="image" onChange={e => setImage(e.target.files[0])}/><br /><br />

                    {image ? <img src={URL.createObjectURL(image)} alt="Imagem do Usuário" width="150" height="150"/> 
                    : <img src={endImg} alt="Imagem do Usuário" width="150" height="150"/>}<br /><br />

                    {/*image ? <img src={URL.createObjectURL(image)} alt="Imagem do Usuário" width="150" height="150"/> 
                    : <img src={endImg} alt="Imagem do Usuário" width="150" height="150"/>*/}<br /><br />

                    * Campo obrigatório<br /><br />
                    <button type="submit">Salvar</button>

            </form>

        </div>
    )
}