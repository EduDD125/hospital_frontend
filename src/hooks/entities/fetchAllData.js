import { useEffect } from "react";

export default function useFetchAllData() {
    async function fetchAllData(endpoint) {

        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log('Erro ao buscar pacientes:', error);
        }
    }

    return fetchAllData;
}
