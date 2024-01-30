import api from "../config/configApi";

export const servDeleteUser = async (idUser) => {

    var status = false;

    const headers = {
        'headers': {
            'Authorization': "Bearer " + localStorage.getItem('token'),
        }
    }
    
    await api.delete("/user/" + idUser, headers)
    .then((response) => {
        status = {
            type: 'success',
            mensagem: response.data.mensagem
        };
    }).catch ((err) => {
        if(err.response) {
            status = {
                type: 'error',
                mensagem: err.response.data.mensagem
            };
        }else {
            status = {
                type: 'error',
                mensagem: "Erro: Tente mais tarde!"
            };
        }
    });

    return status;

}