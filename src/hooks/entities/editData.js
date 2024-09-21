import apiClient from "../../axios/apiClient";

export default function useEditData() {

    async function editDate(option, tipo, itemId, newItem) {

        let endpoint = "";

        if (tipo === "admin") endpoint = `${option}/${itemId}`;
        else if (option === "dadosPessoais") endpoint = `${tipo}s/${itemId}`;
        else if (option === "exames" || option === "consultas") endpoint = `${option}/${tipo}s/${itemId}`;
        else console.log("caso indefinido!!");

        console.log(endpoint)

        try {
            const response = apiClient.put(endpoint, newItem)
            return response;

        } catch (error) {
            console.log(`Erro ao buscar ${option}:`, error);
            if (error.response) {
                // A resposta do servidor veio com um código de status de erro
                console.log("Erro ao buscar exames: ", error.response.status, error.response.data);
              } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.log("Erro ao buscar exames: Sem resposta do servidor");
              } else {
                // Outro tipo de erro ocorreu
                console.log("Erro desconhecido: ", error.message);
            }
        }
    }
    
    return editDate;
}