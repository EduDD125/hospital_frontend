import { useEffect, useState } from "react";
import "./loginModalStyle.css";
import { useLogin } from "../../../hooks/login/useLogin";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ setIsModalLoginOpen }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errors, setErrors] = useState({});
    const { login, loading, error, setError } = useLogin();
    const navigate = useNavigate();

    function handleClose() {
        if (!error) {
            setIsModalLoginOpen(false);
        }
    }

    function validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateFields() {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email é obrigatório.";
        } else if (!validateEmailFormat(email)) {
            newErrors.email = "Formato de email inválido.";
        }

        if (!senha) newErrors.senha = "Senha é obrigatória.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleLogin(e) {
        e.preventDefault();

        if (!validateFields()) return;

        setError("");
        const userData = { email, senha };

        const response = await login(userData);


        if (response && response.status === 200) {
            navigate("/user");
        } else if (error) {
            console.log("error")

            setErrors((prevErrors) => ({
                ...prevErrors,
                server: error,
            }));
        }
    }

    function handleInputChange(setValue, field) {
        return (e) => {
            setValue(e.target.value);
            if (errors[field]) {
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[field];
                    return newErrors;
                });
            }
        };
    }

    return (
        <div className="login-modal__background" onClick={handleClose}>
            <div className="login-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            onChange={handleInputChange(setEmail, "email")}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </label>

                    <label>
                        Senha:
                        <input
                            type="password"
                            name="senha"
                            onChange={handleInputChange(setSenha, "senha")}
                            className={errors.senha ? "input-error" : ""}
                        />
                        {errors.senha && <p className="error-message">{errors.senha}</p>}
                    </label>

                    {errors.server && <p className="error-message">{errors.server}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleClose}>Cancel</button>
                        {!loading ? (
                            <button type="submit">Login</button>
                        ) : (
                            <button type="submit" readOnly>Submitting...</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
