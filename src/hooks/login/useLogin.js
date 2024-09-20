import { useState } from 'react';
import apiClient from "../../axios/apiClient"

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const login = async (userData) => {

    let endpoint = `/login`

    setLoading(true);

    try {
      const response = await apiClient.post(endpoint, userData);
      setData(response.data);
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("role", response.data.role)
      localStorage.setItem("id", response.data.id)
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro ao criar paciente');
      setLoading(false);
    }
  };

  return { login, data, loading, error };
};
