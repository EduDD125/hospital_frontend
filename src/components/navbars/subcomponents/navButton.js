import "./navButtonStyle.css"
import { IoIosNotifications } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { LuStethoscope } from "react-icons/lu";
import { ImLab } from "react-icons/im";

export default function NavButton( {text, tipo, action}) {

    if (tipo == "medicos") {
        return (
            <button className="nav-button" onClick={action}>
                <FaUserDoctor />
                <p>{text}</p>
            </button>
        )
    }
    else if (tipo == "pacientes") {
        return (
            <button className="nav-button" onClick={action}>
                <IoPerson />
                <p>{text}</p>
            </button>
        )
    }
    else if (tipo == "exames") {
        return (
            <button className="nav-button" onClick={action}>
                <ImLab />
                <p>{text}</p>
            </button>
        )

    }
    else if (tipo == "consultas") {
        return (
            <button className="nav-button" onClick={action}>
                <LuStethoscope />
                <p>{text}</p>
            </button>
        )
    }

    else if (tipo === "user_section") {
        return (
            <button className="nav-button" onClick={action}>
                <p>{text}</p>
                <IoIosNotifications />
            </button>
        )
    }

    return(
        <button className="nav-button" onClick={action}>
            <p>{text}</p>
        </button>
    );
}