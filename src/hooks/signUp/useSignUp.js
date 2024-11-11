import { useState } from 'react';
import apiClient from "../../axios/apiClient"

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createUser = async (userData, tipo) => {

    console.log("tipo: ", tipo);
    let endpoint;


    if (tipo === "paciente") endpoint = "/pacientes";
    else if (tipo === "medico") endpoint =  "/medicos";
    else console.log("Tipo de usuário desconhecido");

    console.log(endpoint)

    setLoading(true);
    try {
      console.log("endpoint: ", endpoint, " \n", "userdata: ", userData);
      const response = await apiClient.post(endpoint, userData);
      setData(response.data);
      console.log("data: ", response.data)
      setLoading(false);
      return response
    } catch (err) {
      console.log(err)
      setError(err.response ? err.response.data : 'Erro ao criar paciente');
      setLoading(false);
    }
  };

  return { createUser, data, loading, error, setError };
};
