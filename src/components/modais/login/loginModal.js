import { useState } from "react";
import "./loginModalStyle.css"

export default function LoginModal({setIsModalLoginOpen}) {

    const [email, setEmail] = useState("");
    const [userType, setUserType ] = useState("");
    const [password, setPassword] = useState("");



    function handleClose(event) {
        setIsModalLoginOpen(false);
    }

    function handleLogin() {
        console.log("email: ", email, "| tipo: ", userType, " | password: ", password);
        console.log("fazer hook login");
    }

    return (
        <div className="login-modal__backgroud" onClick={(event) => {handleClose(event)}}>
            <div className="login-modal__container" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
                    <h2>Login</h2>
                </div>
                <label> email:
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label> tipo de usuário:
                    <select name="user_type" onChange={(e) => setUserType(e.target.value)}>
                        <option value="paciente">paciente</option>
                        <option value="medico">médico</option>
                        <option value="administrador">administrador</option>
                    </select>
                </label>
                <label> password:
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <div className="button-area">
                    <button onClick={handleClose}>cancel</button>
                    <button onClick={handleLogin}>login</button>
                </div>
            </div>
        </div>
    )
}