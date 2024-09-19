import { useState } from 'react';
import apiClient from "../../axios/apiClient"

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [endpoint, setEndPoint] = useState(null);

  const createUser = async (userData, tipo) => {

    if (tipo === "paciente") setEndPoint("/pacientes");
    else if (tipo === "medico") setEndPoint("/medicos");
    else console.log("Tipo de usuário desconhecido");


    setLoading(true);
    try {
      const response = await apiClient.post(endpoint, userData);
      setData(response.data);
      console.log("data: ", data)
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro ao criar paciente');
      setLoading(false);
    }
  };

  return { createUser, data, loading, error };
};
