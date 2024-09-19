import { useState } from 'react';
import apiClient from "../../axios/apiClient"

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [endpoint, setEndPoint] = useState(null);

  const login = async (userData, tipo) => {

    let endpoint = `/login/${tipo}`

    setLoading(true);

    try {
      const response = await apiClient.post(endpoint, userData);
      setData(response.data);
      localStorage.setItem("token", data.token)
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro ao criar paciente');
      setLoading(false);
    }
  };

  return { login, data, loading, error };
};
