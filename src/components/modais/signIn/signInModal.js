import { useState } from "react";
import "./signInModalStyle.css";

export default function SignInModal({ setIsModalSignInOpen }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");
    const [userType, setUserType] = useState("");
    const [cri, setCri] = useState("");
    const [dataNascimento, setDataNascimento] = useState("")
    const [especialidade, setEspecialidade] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [estadoCivil, setEstadoCivil] = useState("");

    function handleClose(event) {
        setIsModalSignInOpen(false);
    }

    function handleTypeSelection(event) {
        setUserType(event.target.value);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
            console.log({ nome, email, sexo, userType, dataNascimento, cri, especialidade, password, cpf, estadoCivil });
    }

    return (
        <div className="signin-modal__background" onClick={(event) => handleClose(event)}>
            <div className="signin-modal__container" onClick={e => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Sign in</h2>
                </div>
                    <form onSubmit={handleFormSubmit} className="signin-modal__form">
                        <label>nome:
                            <input type="text" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                        </label>

                        <label>email:
                            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>

                        <label>sexo:
                            <select name="sexo" id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                                <option value="">Selecione...</option>
                                <option value="feminino">feminino</option>
                                <option value="masculino">masculino</option>
                            </select>
                        </label>

                        <label>data de nascimento:
                            <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                        </label>


                        <label>tipo de usuário:
                            <select name="user_type" id="user_type" onChange={handleTypeSelection} value={userType} required>
                                <option value="">Selecione...</option>
                                <option value="paciente">paciente</option>
                                <option value="medico">médico</option>
                            </select>
                        </label>

                        {userType === "medico" && (
                            <>
                                <label>CRI:
                                    <input type="text" name="cri" value={cri} onChange={(e) => setCri(e.target.value)} required />
                                </label>

                                <label>especialidade:
                                    <select name="especialidade" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} required>
                                        <option value="">Selecione...</option>
                                        <option value="cardiologista">cardiologista</option>
                                        <option value="urologia">urologia</option>
                                        <option value="neurologia">neurologia</option>
                                    </select>
                                </label>
                            </>
                        )}

                        {userType === "paciente" && (
                            <>
                                <label>CPF:
                                    <input type="text" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
                                </label>

                                <label>estado civil:
                                    <select name="estado-civil" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} required>
                                        <option value="">Selecione...</option>
                                        <option value="solteiro">solteiro</option>
                                        <option value="casado">casado</option>
                                        <option value="divorciado">divorciado</option>
                                        <option value="viuvo">viúvo</option>
                                    </select>
                                </label>
                            </>
                        )}

                        {userType != "" && (
                            <>
                                <label>senha:
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </label>

                                <label>confirme a senha:
                                    <input type="password" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </label>
                            </>
                        )}
                        

                        <div className="button-area">
                            <button type="button" onClick={handleClose}>cancel</button>
                            <button type="submit">sign in</button>
                        </div>
                    </form>
            </div>
        </div>
    );
}
