import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Doctor({ data }) {
    const [nome, setNome] = useState(data.nome);
    const [sexo, setSexo] = useState(data.sexo);
    const [CRI, setCri] = useState(data.CRI);
    const [dataNascimento, setDataNascimento] = useState(data.dataNascimento);
    const [especialidade, setEspecialidade] = useState(data.especialidade);
    const [cep, setCep] = useState(data.cep);
    const [logradouro, setLogradouro] = useState(data.logradouro);
    const [bairro, setBairro] = useState(data.bairro);
    const [uf, setUf] = useState(data.uf);
    const [estado, setEstado] = useState(data.estado);
    const [errors, setErrors] = useState({});
    const { editData, loading, error, setError } = useEditData();

    useEffect(() => {
        setNome(data.nome);
        setSexo(data.sexo);
        setCri(data.CRI);
        setEspecialidade(data.especialidade);
        setDataNascimento(data.dataNascimento);
        setCep(data.cep);
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setUf(data.uf);
        setEstado(data.estado);
    }, [data]);

    function handleRestore() {
        setNome(data.nome);
        setSexo(data.sexo);
        setCri(data.CRI);
        setDataNascimento(data.dataNascimento);
        setEspecialidade(data.especialidade);
        setCep(data.cep);
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setUf(data.uf);
        setEstado(data.estado);
    }

    function validateFields() {
        const newErrors = {};

        if (!nome) newErrors.nome = "Nome é obrigatório.";
        if (!sexo) newErrors.sexo = "Sexo é obrigatório.";
        if (!dataNascimento) newErrors.dataNascimento = "Data de nascimento é obrigatória.";
        if (!CRI) newErrors.CRI = "CRI é obrigatório.";
        if (!especialidade) newErrors.especialidade = "Especialidade é obrigatória.";
        if (!cep) newErrors.cep = "CEP é obrigatório.";
        if (!logradouro) newErrors.logradouro = "Logradouro é obrigatório.";
        if (!bairro) newErrors.bairro = "Bairro é obrigatório.";
        if (!uf) newErrors.uf = "UF é obrigatório.";
        if (!estado) newErrors.estado = "Estado é obrigatório.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();

        setError("");
        if (!validateFields()) return;

        const newDoctorData = { nome, sexo, dataNascimento, CRI, especialidade, cep, logradouro, bairro, uf, estado };
        const option = "medicos";
        const response = await editData(option, tipo(), data.id, newDoctorData);
        console.log(response);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados médicos</h3>
            </div>
            {data !== "" ? (
                <form onSubmit={(e) => handleEdition(e)}>
                    <label>Nome:
                        <input
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className={errors.nome ? "input-error" : ""}
                        />
                        {errors.nome && <p className="error-message">{errors.nome}</p>}
                    </label>

                    <label>Sexo:
                        <select
                            name="sexo"
                            id="sexo"
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

                    <label>Data de nascimento:
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
                            className={errors.CRI ? "input-error" : ""}
                        />
                        {errors.CRI && <p className="error-message">{errors.CRI}</p>}
                    </label>

                    <label>Especialidade:
                        <input
                            type="text"
                            name="especialidade"
                            value={especialidade}
                            onChange={(e) => setEspecialidade(e.target.value)}
                            className={errors.especialidade ? "input-error" : ""}
                        />
                        {errors.especialidade && <p className="error-message">{errors.especialidade}</p>}
                    </label>

                    {/* Campos de endereço */}
                    <label>CEP:
                        <input
                            type="text"
                            name="cep"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            className={errors.cep ? "input-error" : ""}
                        />
                        {errors.cep && <p className="error-message">{errors.cep}</p>}
                    </label>

                    <label>Logradouro:
                        <input
                            type="text"
                            name="logradouro"
                            value={logradouro}
                            onChange={(e) => setLogradouro(e.target.value)}
                            className={errors.logradouro ? "input-error" : ""}
                        />
                        {errors.logradouro && <p className="error-message">{errors.logradouro}</p>}
                    </label>

                    <label>Bairro:
                        <input
                            type="text"
                            name="bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            className={errors.bairro ? "input-error" : ""}
                        />
                        {errors.bairro && <p className="error-message">{errors.bairro}</p>}
                    </label>

                    <label>UF:
                        <input
                            type="text"
                            name="uf"
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                            className={errors.uf ? "input-error" : ""}
                        />
                        {errors.uf && <p className="error-message">{errors.uf}</p>}
                    </label>

                    <label>Estado:
                        <input
                            type="text"
                            name="estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className={errors.estado ? "input-error" : ""}
                        />
                        {errors.estado && <p className="error-message">{errors.estado}</p>}
                    </label>

                    {error && <p className="error-message">{error}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleRestore}>Restaurar</button>
                        {loading ? (
                            <button readOnly>Editando...</button>
                        ) : (
                            <button type="submit">Salvar edição</button>
                        )}
                    </div>
                </form>
            ) : (
                <p>Clique em um item da tabela para detalhá-lo.</p>
            )}
        </div>
    );
}
