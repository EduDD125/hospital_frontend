import "./loginModalStyle.css"

export default function LoginModal({setIsModalLoginOpen}) {

    function handleClose(event) {
        setIsModalLoginOpen(false);
        
    }

    return (
        <div className="login-modal__backgroud" onClick={(event) => {handleClose(event)}}>
            <div className="login-modal__container" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
                    <h2>Login</h2>
                </div>
                <label> username:
                    <input type="text" name="username" required />
                </label>
                <label> tipo de usuário:
                    <select name="user_type" id="user_type">
                        <option value="paciente">paciente</option>
                        <option value="medico">médico</option>
                        <option value="administrador">administrador</option>
                    </select>
                </label>
                <label> password:
                    <input type="password" name="password" required />
                </label>
                <div className="button-area">
                    <button onClick={handleClose}>cancel</button>
                    <button>login</button>
                </div>
            </div>
        </div>
    )
}