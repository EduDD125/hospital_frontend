import { token } from "./../authentificationToken/getToken"
import apiClient from "./../../axios/apiClient"

export default function useFetchAllData() {

    async function fetchAllData(option) {

        const endpoint = `/${option}`;
        console.log(endpoint);

        try {
            const response = await apiClient.get("http://localhost:3000/"+option);
            console.log(response);
            return response.data;
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

    return fetchAllData;
}
