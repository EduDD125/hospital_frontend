import React, { useState, useEffect } from "react";
import "./userNavbarStyle.css";
import NavButton from "../subcomponents/navButton";
import { getUserName } from "../../../hooks/entities/getUserName";
import { getDoctorName } from "../../../hooks/entities/getDoctorName";

export default function UserNavbar({ tipo, setOption }) {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function fetchUserName() {
            if (role === "medico") {
                const name = await getDoctorName(id);
                setUserName(name);
            } else if (role === "paciente") {
                const name = await getUserName(id);
                setUserName(name);
            }
        }
        fetchUserName();
    }, [id, role]);

    function seeUserExams() {
        setOption("exames");
    }

    function seeUserAppoitments() {
        setOption("consultas");
    }

    function seePacients() {
        setOption("pacientes");
    }

    function seeDoctors() {
        setOption("medicos");
    }

    function seeUserData() {
        setOption("dadosPessoais");
    }

    function seeLogs() {
        setOption("logs");
    }

    if (tipo === "paciente" || tipo === "medico")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                </div>
                <NavButton text={userName} tipo="user_section" action={seeUserData} />
            </nav>
        );
    else if (tipo === "admin")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                    <NavButton text="Médicos" tipo="medicos" action={seeDoctors} />
                    <NavButton text="Pacientes" tipo="pacientes" action={seePacients} />
                </div>
            </nav>
        );
    return "Tipo de usuário indefinido";
}