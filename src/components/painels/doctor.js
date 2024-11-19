import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Doctor({ data }) {
    const [nome, setNome] = useState(data.nome);
    const [sexo, setSexo] = useState(data.sexo);
    const [CRI, setCri] = useState(data.CRI);
    const [dataNascimento, setDataNascimento] = useState(
        data.dataNascimento ? new Date(data.dataNascimento).toISOString().split('T')[0] : ''
    );
    const [especialidade, setEspecialidade] = useState(data.especialidade);
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    console.log("data de nascimento:", dataNascimento)

    useEffect(() => {
        setNome(data.nome);
        setSexo(data.sexo);
        setCri(data.CRI);
        setEspecialidade(data.especialidade);
        setDataNascimento(data.dataNascimento ? new Date(data.dataNascimento).toISOString().split('T')[0] : '');
        setError("");
        setErrors("");
    }, [data]);

    function validateFields() {
        let newErrors = {};

        if (!nome) newErrors.nome = "Nome é obrigatório.";
        if (!sexo) newErrors.sexo = "Sexo é obrigatório.";
        if (!dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória.";
        if (!especialidade) newErrors.especialidade = "Especialidade é obrigatória.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleRestore() {
        setNome(data.nome);
        setSexo(data.sexo);
        setCri(data.CRI);
        setDataNascimento(data.dataNascimento);
        setEspecialidade(data.especialidade);
        setErrors({});
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");

        if (!validateFields()) return;

        const newDoctorData = { nome, sexo, dataNascimento, especialidade };
        const option = "medicos";
        const response = await editData(option, tipo(), data.id, newDoctorData);
        console.log("editado:", response);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados médicos</h3>
            </div>
            {data !== "" ? (
                <form onSubmit={(e) => handleEdition(e)}>
                    <label>nome:
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className={errors.nome ? "input-error" : ""}
                        />
                        {errors.nome && <p className="error-message">{errors.nome}</p>}
                    </label>

                    <label>sexo:
                        <select
                            name="sexo"
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                            className={errors.sexo ? "input-error" : ""}
                        >
                            <option value="">Selecione...</option>
                            <option value="feminino">feminino</option>
                            <option value="masculino">masculino</option>
                        </select>
                        {errors.sexo && <p className="error-message">{errors.sexo}</p>}
                    </label>

                    <label>data de nascimento:
                        <input
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            className={errors.dataNascimento ? "input-error" : ""}
                        />
                        {errors.dataNascimento && <p className="error-message">{errors.dataNascimento}</p>}
                    </label>

                    <label>CRI:
                        <input
                            type="text"
                            name="CRI"
                            value={CRI}
                            readOnly
                        />
                    </label>

                    <label>especialidade:
                        <select
                            name="especialidade"
                            value={especialidade}
                            onChange={(e) => setEspecialidade(e.target.value)}
                            className={errors.especialidade ? "input-error" : ""}
                        >
                            <option value="">Selecione...</option>
                            <option value="cardiologista">cardiologista</option>
                            <option value="urologia">urologia</option>
                            <option value="neurologia">neurologia</option>
                        </select>
                        {errors.especialidade && <p className="error-message">{errors.especialidade}</p>}
                    </label>

                    {error && <p className="error-message">{error.response.data.message}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleRestore}>restaurar</button>
                        {loading ? (
                            <button disabled>Editando...</button>
                        ) : (
                            <button type="submit">salvar edição</button>
                        )}
                    </div>
                </form>
            ) : (
                <p>Clique em um item da tabela para detalha-lo.</p>
            )}
        </div>
    );
}
