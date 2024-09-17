import "./userNavbarStyle.css"
import NavButton from "../subcomponents/navButton";

export default function UserNavbar({tipo}) {

    const userName = "nome usuário - mudar";

    function seeUserExams () {
        console.log("exames")
    }

    function seeUserAppoitments () {
        console.log("agendamentos")
    }
    
    function seePacients () {
        console.log("pacientes")
    }
    
    function seeDoctors () {
        console.log("medicos")
    }

    function seeUserData () {
        console.log("dados usuário")
    }
    
    if (tipo == "paciente")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                    <NavButton text="Exames" tipo="exames" action={seeUserExams}/>
                    <NavButton text="Consultas" tipo="consultas" action={seeUserAppoitments}/>
                </div>
                <NavButton text={userName} tipo="user_section" action={seeUserData}/>
            </nav>
        );
    else if (tipo === "medico")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                    <NavButton text="Dados pessoais" tipo="dadosUsuario" action={seeUserData}/>
                    <NavButton text="Pacientes" tipo="pacientes" action={seePacients}/>
                    <NavButton text="Exames" tipo="exames" action={seeUserExams}/>
                    <NavButton text="Consultas" tipo="consultas" action={seeUserAppoitments}/>
                </div>
                <NavButton text={userName} tipo="user_section" action={seeUserData}/>
            </nav>
        );
    else if (tipo === "administrador")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                    <NavButton text="Médicos" tipo="medicos" action={seeDoctors}/>
                    <NavButton text="Pacientes" tipo="pacientes" action={seePacients}/>
                    <NavButton text="Exames" tipo="exames" action={seeUserExams}/>
                    <NavButton text="Consultas" tipo="consultas" action={seeUserAppoitments}/>
                </div>
            </nav>
        );
}