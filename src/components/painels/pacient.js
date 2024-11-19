import { useContext, useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";
import { refreshTableContext } from "../../contexts/appContext";

export default function Pacient({ data }) {
    const [nome, setNome] = useState(data.nome);
    const [email, setEmail] = useState(data.email);
    const [sexo, setSexo] = useState(data.sexo);
    const [dataNascimento, setDataNascimento] = useState(data.dataNascimento);
    const [CPF, setCpf] = useState(data.CPF);
    const [estadoCivil, setEstadoCivil] = useState(data.estadoCivil);
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    const {refreshTable, setRefreshTable} = useContext(refreshTableContext)

    useEffect(() => {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(data.dataNascimento);
        setCpf(data.CPF);
        setCep(data.cep);
        setEstadoCivil(data.estadoCivil);
    }, [data]);

    function validateFields() {
        let newErrors = {};

        if (!nome) newErrors.nome = "Nome é obrigatório.";
        if (!sexo) newErrors.sexo = "Sexo é obrigatório.";
        if (!dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória.";
        if (!CPF) newErrors.CPF = "CPF é obrigatório.";
        if (!estadoCivil) newErrors.estadoCivil = "Estado civil é obrigatório.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleRestore() {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(data.dataNascimento);
        setCpf(data.CPF);
        setEstadoCivil(data.estadoCivil);
        setErrors({});
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        if (!validateFields()) return;

        const newPacientData = { nome, email, sexo, dataNascimento, CPF, estadoCivil };
        const option = "pacientes";
        const response = await editData(option, tipo(), data.id, newPacientData);
        console.log("editado:", response);
        setRefreshTable(!refreshTable);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados pacientes</h3>
            </div>
            {data !== "" ? (
                <form onSubmit={handleEdition}>
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

                    <label>email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            readOnly
                        />
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

                    <label>CPF:
                        <input
                            type="text"
                            name="CPF"
                            value={CPF}
                            readOnly
                        />
                    </label>

                    <label>estado civil:
                        <input
                            type="text"
                            name="estadoCivil"
                            value={estadoCivil}
                            onChange={(e) => setEstadoCivil(e.target.value)}
                            className={errors.estadoCivil ? "input-error" : ""}
                        />
                        {errors.estadoCivil && <p className="error-message">{errors.estadoCivil}</p>}
                    </label>

                    {error && <p className="error-message">{error}</p>}

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
