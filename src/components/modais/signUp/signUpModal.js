import { useState } from "react";
import "./signUpModalStyle.css";
import { useCreateUser } from "../../../hooks/signUp/useSignUp";

export default function SignInModal({ setIsModalSignInOpen }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [CRI, setCRI] = useState("");
    const [dataNaoTratada, setDataNaoTratada] = useState("")
    const [especialidade, setEspecialidade] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmsenha, setConfirmsenha] = useState("");
    const [CPF, setCPF] = useState("");
    const [estadoCivil, setEstadoCivil] = useState("");

    const { createUser, data, loading, error } = useCreateUser();

    function handleClose() {
        setIsModalSignInOpen(false);
    }

    function handleTypeSelection(event) {
        setTipoUsuario(event.target.value);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        let userData = {};
        const dataNascimento = new Date(dataNaoTratada);

        
        if (tipoUsuario === "paciente") {
            userData = {nome, CPF, sexo, dataNascimento, estadoCivil, email, senha};
        }
        else if (tipoUsuario === "medico") {
            userData ={nome, CRI, sexo, dataNascimento, especialidade, email, senha};
        }
        else {
            alert("tipo de usuário indefinido")
            return;
        }

        if (senha !== confirmsenha){ 
            alert("senhas e senha de confirmação incompativeis");
            return;
        }

        await createUser(userData, tipoUsuario);
        if (data) {
            console.log(data);
            handleClose();
        }
        else if (error) console.log(error);
    }

    return (
        <div className="signin-modal__background" onClick={() => handleClose()}>
            <div className="signin-modal__container" onClick={e => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Sign Up</h2>
                </div>
                    <form onSubmit={(e) => handleFormSubmit(e)} className="signin-modal__form">
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
                            <input type="date" value={dataNaoTratada} onChange={(e) => setDataNaoTratada(e.target.value)} />
                        </label>


                        <label>tipo de usuário:
                            <select name="user_type" id="user_type" onChange={handleTypeSelection} value={tipoUsuario} required>
                                <option value="">Selecione...</option>
                                <option value="paciente">paciente</option>
                                <option value="medico">médico</option>
                            </select>
                        </label>

                        {tipoUsuario === "medico" && (
                            <>
                                <label>CRI:
                                    <input type="text" name="CRI" value={CRI} onChange={(e) => setCRI(e.target.value)} required />
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

                        {tipoUsuario === "paciente" && (
                            <>
                                <label>CPF:
                                    <input type="text" name="CPF" value={CPF} onChange={(e) => setCPF(e.target.value)} required />
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

                        {tipoUsuario !== "" && (
                            <>
                                <label>senha:
                                    <input type="senha" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                                </label>

                                <label>confirme a senha:
                                    <input type="senha" name="confirm_senha" value={confirmsenha} onChange={(e) => setConfirmsenha(e.target.value)} required />
                                </label>
                            </>
                        )}
                        {error && <p className="error-message">{error.message}</p>}

                        <div className="button-area">
                            <button type="button" onClick={handleClose}>cancel</button>
                            {!loading ?
                                <button type="submit" >Sing Up</button>
                            :
                                <button type="submit" readonly>Submitting</button>
                            }
                        </div>
                    </form>
            </div>
        </div>
    );
}
