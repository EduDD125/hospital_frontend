import React, { useState, useEffect } from "react";
import "./userNavbarStyle.css";
import NavButton from "../subcomponents/navButton";
import { getPacientData } from "../../../hooks/entities/getPacientData";
import { getDoctorData } from "../../../hooks/entities/getDoctorData";

export default function UserNavbar({ tipo, setOption }) {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    const [userName, setUserName] = useState("");
    const [userAvatarUrl, setUserAvatarUrl] = useState("");

    useEffect(() => {
        async function fetchUserName() {
            if (role === "medico") {
                const { name, userAvatarUrl } = await getDoctorData(id);
                setUserName(name);
                setUserAvatarUrl(userAvatarUrl);
            } else if (role === "paciente") {
                const { name, userAvatarUrl } = await getPacientData(id);
                setUserName(name);
                setUserAvatarUrl(userAvatarUrl);
            }
        }
        fetchUserName();
    }, [id, role]);

    function seeExams() {
        setOption("exames");
    }

    function seeAppoitments() {
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
                    {/*
                    <NavButton text="Exames" tipo="exames" action={seeExams} />
                    <NavButton text="Consultas" tipo="consultas" action={seeAppoitments} />
                    */}
                </div>
                <NavButton text={userName} tipo="user_section" action={seeUserData} userAvatarUrl={userAvatarUrl}/>
            </nav>
        );
    else if (tipo === "admin")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                    <NavButton text="Médicos" tipo="medicos" action={seeDoctors} />
                    {/*
                    <NavButton text="Pacientes" tipo="pacientes" action={seePacients} />
                    <NavButton text="Exames" tipo="exames" action={seeExams} />
                    <NavButton text="Consultas" tipo="consultas" action={seeAppoitments} />
                    <NavButton text="Logs" tipo="logs" action={seeLogs} />
                    */}
                </div>
            </nav>
        );
    return "Tipo de usuário indefinido";
}