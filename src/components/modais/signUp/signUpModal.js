import { useEffect, useState } from "react";
import "./signUpModalStyle.css";
import { useCreateUser } from "../../../hooks/signUp/useSignUp";

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

    const [errors, setErrors] = useState({});
    const { createUser, loading, error, setError } = useCreateUser();

    function handleClose() {
        setIsModalSignInOpen(false);
    }

    function handleTypeSelection(event) {
        setTipoUsuario(event.target.value);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateFields() {
        let newErrors = {};
        const today = new Date();
        const birthDate = new Date(dataNaoTratada);

        if (!nome) newErrors.nome = "Nome é obrigatório.";
        if (!email) {
            newErrors.email = "Email é obrigatório.";
        } else if (!validateEmail(email)) {
            newErrors.email = "Formato de email inválido.";
        }
        if (!sexo) newErrors.sexo = "Sexo é obrigatório.";
        if (!dataNaoTratada) newErrors.dataNaoTratada = "Data de nascimento é obrigatória.";
        else if (birthDate > today) newErrors.dataNaoTratada = "Data de nascimento não pode ser uma data futura.";
        if (!tipoUsuario) newErrors.tipoUsuario = "Tipo de usuário é obrigatório.";

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
        let dataNascimento = new Date(dataNaoTratada).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        userData = tipoUsuario === "paciente" 
            ? { nome, CPF, sexo, dataNascimento, estadoCivil, email, senha }
            : { nome, CRI, sexo, dataNascimento, especialidade, email, senha };

        setError("");
        try {
            const response = await createUser(userData, tipoUsuario);

            if (response && response.status === 200) {
                handleClose();
            } else if (error) {
                handleErrors(error);
            }
        } catch (err) {
            console.log("err:", err);
        }
    }

    function handleErrors(error) {
        switch (error.code) {
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
    }

    function handleInputChange(setValue, fieldName) {
        return (event) => {
            const value = event.target.value;
            setValue(value);
            if (value) {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[fieldName];
                    return newErrors;
                });
            }
        };
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
                            onChange={handleInputChange(setNome, "nome")}
                            className={errors.nome ? "input-error" : ""}
                        />
                        {errors.nome && <p className="error-message">{errors.nome}</p>}
                    </label>

                    <label>email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange(setEmail, "email")}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </label>

                    <label>sexo:
                        <select
                            name="sexo"
                            id="sexo"
                            value={sexo}
                            onChange={handleInputChange(setSexo, "sexo")}
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
                            onChange={handleInputChange(setDataNaoTratada, "dataNaoTratada")}
                            className={errors.dataNaoTratada ? "input-error" : ""}
                        />
                        {errors.dataNaoTratada && <p className="error-message">{errors.dataNaoTratada}</p>}
                    </label>

                    <label>tipo de usuário:
                        <select
                            name="user_type"
                            id="user_type"
                            onChange={(e) => {
                                handleTypeSelection(e);
                                handleInputChange(setTipoUsuario, "tipoUsuario")(e);
                            }}
                            value={tipoUsuario}
                            className={errors.tipoUsuario ? "input-error" : ""}
                        >
                            <option value="">Selecione...</option>
                            {/*<option value="paciente">paciente</option>*/}
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
                                    onChange={handleInputChange(setCRI, "CRI")}
                                    className={errors.CRI ? "input-error" : ""}
                                />
                                {errors.CRI && <p className="error-message">{errors.CRI}</p>}
                            </label>

                            <label>especialidade:
                                <select
                                    name="especialidade"
                                    value={especialidade}
                                    onChange={handleInputChange(setEspecialidade, "especialidade")}
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
                                    onChange={handleInputChange(setCPF, "CPF")}
                                    className={errors.CPF ? "input-error" : ""}
                                />
                                {errors.CPF && <p className="error-message">{errors.CPF}</p>}
                            </label>

                            <label>estado civil:
                                <select
                                    name="estado-civil"
                                    value={estadoCivil}
                                    onChange={handleInputChange(setEstadoCivil, "estadoCivil")}
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


                    <label>senha:
                        <input
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={handleInputChange(setSenha, "senha")}
                            className={errors.senha ? "input-error" : ""}
                        />
                        {errors.senha && <p className="error-message">{errors.senha}</p>}
                    </label>

                    <label>confirme a senha:
                        <input
                            type="password"
                            name="confirm_senha"
                            value={confirmsenha}
                            onChange={handleInputChange(setConfirmsenha, "confirmsenha")}
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
