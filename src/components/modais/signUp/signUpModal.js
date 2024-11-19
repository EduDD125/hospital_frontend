import { useState, useEffect } from "react";
import "./signUpModalStyle.css";
import { useCreateUser } from "../../../hooks/signUp/useSignUp";
import { useCreateAddress } from "../../../hooks/signUp/useSignUp";

export default function SignInModal({ setIsModalSignInOpen }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [CRI, setCRI] = useState("");
    const [dataNaoTratada, setDataNaoTratada] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmsenha, setConfirmsenha] = useState("");
    const [CPF, setCPF] = useState("");
    const [estadoCivil, setEstadoCivil] = useState("");

    {/* dados da API via CEP*/}
    const [cep, setCep] = useState('');
    const [viaCEPdata, setViaCEPdata] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [uf, setUf] = useState('');
    const [estado, setEstado] = useState('');

    const [viaCEPError, setViaCEPError] = useState(null);

    const [errors, setErrors] = useState({});
    const { createUser, data, loading, error, setError } = useCreateUser();
    const { createAddress, addData, addLoading, addError, addSetError} = useCreateAddress();

    function handleClose() {
        setIsModalSignInOpen(false);
    }

    function handleTypeSelection(event) {
        setTipoUsuario(event.target.value);
    }

    async function handleFetch(e) {
        const cepValue = e.target.value;
        setCep(cepValue)
        setViaCEPError(null); // Limpa o erro anterior
        setViaCEPdata(null); // Limpa os dados anteriores

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
            if (!response.ok) {
                throw new Error('CEP não encontrado');
            }
            const jsonData = await response.json();
            console.log("cep search response:", response)
            setViaCEPdata(jsonData);
        } catch (error) {
            setViaCEPError(error.message);
        }
    };

    useEffect( () => {
        if (viaCEPdata) {
          setLogradouro(viaCEPdata.logradouro);
          setBairro(viaCEPdata.bairro);
          setUf(viaCEPdata.uf);
          setEstado(viaCEPdata.estado);
          return;
        }
        setLogradouro("");
        setBairro("");
        setUf("");
        setEstado("");
        setViaCEPError(null);
  
      },[viaCEPdata]);

    function validateFields() {
        let newErrors = {};

        if (!nome) newErrors.nome = "Nome é obrigatório.";
        if (!email) newErrors.email = "Email é obrigatório.";
        if (!sexo) newErrors.sexo = "Sexo é obrigatório.";
        if (!dataNaoTratada) newErrors.dataNaoTratada = "Data de nascimento é obrigatória.";
        if (!tipoUsuario) newErrors.tipoUsuario = "Tipo de usuário é obrigatório.";
        if (!cep) newErrors.cep = "CEP de usuário é obrigatório.";

        if (tipoUsuario === "medico") {
            if (!CRI) newErrors.CRI = "CRI é obrigatório para médicos.";
            if (!especialidade) newErrors.especialidade = "Especialidade é obrigatória para médicos.";
        } else if (tipoUsuario === "paciente") {
            if (!CPF) newErrors.CPF = "CPF é obrigatório para pacientes.";
            if (!estadoCivil) newErrors.estadoCivil = "Estado civil é obrigatório para pacientes.";
        }

        if (!senha) newErrors.senha = "Senha é obrigatória.";
        if (senha !== confirmsenha) newErrors.confirmsenha = "Senhas não coincidem.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleFormSubmit(event) {
        event.preventDefault();
    
        if (!validateFields()) return;
    
        let userData = {};
        let addressData = {};
        let dataNascimento = new Date(dataNaoTratada).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    
        userData = tipoUsuario === "paciente"
            ? { nome, CPF, sexo, dataNascimento, estadoCivil, email, senha}
            : { nome, CRI, sexo, dataNascimento, especialidade, email, senha };
    
        addressData = {cep, logradouro, bairro, estado}   
        setError("");
        
        try {
            const response = await createUser(userData, tipoUsuario);
            const userId = response.data.id;

            if (response && response.status === 200) {
                try {
                    createAddress(addressData, userId, tipoUsuario);

                } catch (error) {
                    setError("Erro ao cadastrar endereço.");
                }
                handleClose(); // Feche o modal imediatamente após uma resposta bem-sucedida
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.data.code) {
                    case "EMAIL_IN_USE":
                        setErrors((prevErrors) => ({ ...prevErrors, email: "Este email já está em uso." }));
                        break;
                    case "CPF_IN_USE":
                        setErrors((prevErrors) => ({ ...prevErrors, CPF: "Este CPF já está em uso." }));
                        break;
                    case "EMPTY_FIELDS":
                        setError("Todos os campos são obrigatórios.");
                        break;
                    case "SERVER_ERROR":
                    default:
                        setError("Erro no servidor. Tente novamente mais tarde.");
                }
            } else {
                setError("Erro de conexão. Tente novamente mais tarde.");
            }
        }
    }
    
    

    return (
        <div className="signup-modal__background" onClick={() => handleClose()}>
            <div className="signup-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={(e) => handleFormSubmit(e)} className="signup-modal__form">
                    
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
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </label>

                    <label>sexo:
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

                    <label>data de nascimento:
                        <input
                            type="date"
                            value={dataNaoTratada}
                            onChange={(e) => setDataNaoTratada(e.target.value)}
                            className={errors.dataNaoTratada ? "input-error" : ""}
                        />
                        {errors.dataNaoTratada && <p className="error-message">{errors.dataNaoTratada}</p>}
                    </label>

                    <label>tipo de usuário:
                        <select
                            name="user_type"
                            id="user_type"
                            onChange={handleTypeSelection}
                            value={tipoUsuario}
                            className={errors.tipoUsuario ? "input-error" : ""}
                        >
                            <option value="">Selecione...</option>
                            <option value="paciente">paciente</option>
                            <option value="medico">médico</option>
                        </select>
                        {errors.tipoUsuario && <p className="error-message">{errors.tipoUsuario}</p>}
                    </label>

                    {tipoUsuario === "medico" && (
                        <>
                            <label>CRI:
                                <input
                                    type="text"
                                    name="CRI"
                                    value={CRI}
                                    onChange={(e) => setCRI(e.target.value)}
                                    className={errors.CRI ? "input-error" : ""}
                                />
                                {errors.CRI && <p className="error-message">{errors.CRI}</p>}
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
                        </>
                    )}

                    {tipoUsuario === "paciente" && (
                        <>
                            <label>CPF:
                                <input
                                    type="text"
                                    name="CPF"
                                    value={CPF}
                                    onChange={(e) => setCPF(e.target.value)}
                                    className={errors.CPF ? "input-error" : ""}
                                />
                                {errors.CPF && <p className="error-message">{errors.CPF}</p>}
                            </label>

                            <label>estado civil:
                                <select
                                    name="estado-civil"
                                    value={estadoCivil}
                                    onChange={(e) => setEstadoCivil(e.target.value)}
                                    className={errors.estadoCivil ? "input-error" : ""}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="solteiro">solteiro</option>
                                    <option value="casado">casado</option>
                                    <option value="divorciado">divorciado</option>
                                    <option value="viuvo">viúvo</option>
                                </select>
                                {errors.estadoCivil && <p className="error-message">{errors.estadoCivil}</p>}
                            </label>
                        </>
                    )}

                    <div className="cep-infos">
                        <label>CEP:
                            <input type="text" value={cep} onChange={(e) => handleFetch(e)} 
                            className={errors.cep ? "input-error" : ""}/>
                            {errors.cep && <p className="error-message">{errors.cep}</p>}
                        </label>

                        <label>Logradouro:
                            <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                        </label>

                        <label>Bairro:
                            <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </label>

                        <label>UF:
                            <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} />
                        </label>

                        <label>Estado:
                            <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
                        </label>

                    </div>

                    <label>senha:
                        <input
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className={errors.senha ? "input-error" : ""}
                        />
                        {errors.senha && <p className="error-message">{errors.senha}</p>}
                    </label>

                    <label>confirme a senha:
                        <input
                            type="password"
                            name="confirm_senha"
                            value={confirmsenha}
                            onChange={(e) => setConfirmsenha(e.target.value)}
                            className={errors.confirmsenha ? "input-error" : ""}
                        />
                        {errors.confirmsenha && <p className="error-message">{errors.confirmsenha}</p>}
                    </label>

                    {error && <p className="error-message">{error}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleClose}>cancel</button>
                        {!loading ?
                            <button type="submit">Sign Up</button>
                        :
                            <button type="submit" readOnly>Submitting</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
