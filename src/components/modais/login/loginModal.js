import { useState } from "react";
import "./loginModalStyle.css"
import { useLogin } from "../../../hooks/login/useLogin";

export default function LoginModal({setIsModalLoginOpen}) {

    const [email, setEmail] = useState("");
    const [tipo, setTipo ] = useState("");
    const [senha, setSenha] = useState("");
    const {login, data, error} = useLogin();



    function handleClose() {
        setIsModalLoginOpen(false);
    }

    function handleLogin() {
        let userData = {};
        if (tipo === "paciente" || tipo === "medico" || tipo === "admin") {
            userData = {email, senha};
        }
        else {
            alert("tipo de usuário indefinido")
            return;
        }

        login(userData, tipo);
        if (data) console.log(data);
        else if (error) console.log(error);
    }

    return (
        <div className="login-modal__backgroud" onClick={() => {handleClose()}}>
            <div className="login-modal__container" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
                    <h2>Login</h2>
                </div>
                <label> email:
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label> tipo de usuário:
                    <select name="tipo" onChange={(e) => setTipo(e.target.value)}>
                        <option value="">Selecione...</option>
                        <option value="paciente">paciente</option>
                        <option value="medico">médico</option>
                        <option value="admin">administrador</option>
                    </select>
                </label>
                <label> senha:
                    <input type="password" name="senha" onChange={(e) => setSenha(e.target.value)} required />
                </label>
                <div className="button-area">
                    <button onClick={handleClose}>cancel</button>
                    <button onClick={handleLogin}>login</button>
                </div>
            </div>
        </div>
    )
}