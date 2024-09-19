import { useState } from 'react';
import apiClient from '../../axios/apiClient'

export default function useLogin() {
    const [endpoint, setEndpoint] = useState();


    async function login(email, senha, tipo) {

        console.log("tipo: ", tipo, " email: ", email, " senha: ", senha)
        if (tipo == "medico") setEndpoint("/login/medico");
        else if (tipo == "paciente") setEndpoint("/login/paciente");
        else if (tipo == "administrador") setEndpoint("/login/admin");
        else {
            console.log("tipo de usuário desconhecido");
            //return
        }

        apiClient.post(endpoint, {
            email: email,
            senha: senha
        } )
            .then( response => {
                console.log("Login bem sucedido: ", response.data);
                const token = response.data.token;
                localStorage.setItem("token", token)
            })
            .catch(error => {
                if(error.response)
                    console.log("Error ao fazer login:", error.response.data.message)
                else
                    console.log("Erro de rede ou outro: ", error.message)
            })
    }

    return login;
}