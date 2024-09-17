import apiClient from '../../axios/apiClient'

export default function useSign() {
    const [endpoint, setEndpoint] = useState();

    function signIn({ nome, email, sexo, userType, dataNascimento, cri, especialidade, password, cpf, estadoCivil }) {
        
        if (tipo === "medico") setEndpoint("/medico")
        else if (tipo === "paciente") setEndpoint("/paciente")

        try {
            if(userType=="paciente") {
                apiClient.post(endpoint, {
                    nome: nome, CPF: cpf, sexo: sexo, dataNascimento: dataNascimento,
                    estadoCivil: estadoCivil, email: email, senha: password
                } )
                    .then( response => {
                       console.log("Cadastro bem sucedido: ", response.data);
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
            else if (userType == "medico") {
                apiClient.post(endpoint, {
                    nome: nome, CRI: cri, sexo: sexo, dataNascimento: dataNascimento,
                    especialidade: especialidade, email: email, senha: password
                } )
                    .then( response => {
                       console.log("Cadastro bem sucedido: ", response.data);
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
            else console.log("Tipo de usuário não aceito");
        }catch (error) {
            console.log(error);
        }
    }

    return signIn();
}