import { useState } from "react";
import "./signInModalStyle.css"

export default function SignInModal({setIsModalSignInOpen}) {

    const [userType, setUserType] = useState("");

    function handleClose(event) {
        setIsModalSignInOpen(false);
    }

    function handleTypeSelection(event) {
            console.log(event.target.value)
    }   

    return (
        <div className="signin-modal__backgroud" onClick={(event) => {handleClose(event)}}>
            <div className="signin-modal__container" onClick={e => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Sign in</h2>
                </div>
                <label>nome:
                    <input type="text" name="username" required />
                </label>

                <label>sexo:
                    <select name="sexo" id="sexo">
                        <option value="faminino">feminino</option>
                        <option value="masculino">masculino</option>
                    </select>
                </label>
                <label>tipo de usuário:
                    <select name="user_type" id="user_type" onChange={(event) => handleTypeSelection(event)}>
                        <option value="paciente">paciente</option>
                        <option value="medico">médico</option>
                        <option value="administrador">administrador</option>
                    </select>
                </label>

                {userType == "medico" ?
                    <>
                        <label>CRMI:
                            <input type="text" name="crmi" required />
                        </label>

                        <label>especialidade:
                            <select name="especialidade">
                                <option value="cardiologista">cardiologista</option>
                                <option value="urologia">urologia</option>
                                <option value="neurologia">neurologia</option>
                            </select>
                        </label>
                    </>
                    :
                    <></>
                }

                {userType == "paciente" ?
                    <>
                        <label>CPF:
                            <input type="text" name="cpf" required />
                        </label>

                        <label>estado civil:
                            <select name="estado-civil">
                                <option value="solteiro">solteiro</option>
                                <option value="casado">casado</option>
                                <option value="divorciado">divorciado</option>
                                <option value="viuvo">viuvo</option>
                            </select>
                        </label>
                    </>
                    :
                    <></>
                }

                <label>senha:
                    <input type="password" name="password" required />
                </label>
                <label>confirme a senha:
                    <input type="confirm_password" name="confirm_password" required />
                </label>

                <div className="button-area">
                    <button onClick={handleClose}>cancel</button>
                    <button >sign in</button>
                </div>
            </div>
        </div>
    )
}