import { useEffect, useState } from "react";
import { tipo } from "../../hooks/getUserType";
import useEditData from "../../hooks/entities/editData";

export default function Appointment({data}) {
    
    const [id, setId] = useState(data.id);
    const [idMedico, setIdMedico] = useState(data.idMedico);
    const [idPaciente, setIdPaciente] = useState(data.idPaciente);
    const [medico, setMedico] = useState("");
    const [paciente, setPaciente] = useState("");
    const [dataHorario, setDataHorario] = useState(data.dataHorario);
    const {editData, loading, error, setError } = useEditData();

   console.log(id, idMedico, idPaciente, dataHorario, medico, paciente);
    
    useEffect( () => {
        setId(data.id);
        setIdMedico(data.idMedico);
        setIdPaciente(data.idPaciente);
        if (data.medico) setMedico(data.medico.nome);
        if (data.paciente) setPaciente(data.paciente.nome);
        setDataHorario(data.dataHorario);
    },[data] )
    

    function handleRestore() {
        setDataHorario(data.dataHorario);
    }

    async function handleEdition(event) {
        event.preventDefault();


        setError("")
        const newConsultData = {id, idMedico, idPaciente, dataHorario, medico, paciente};
        console.log(newConsultData)
        const option = "consultas";
        const response = await editData(option, tipo(), data.id, newConsultData);
        console.log(response);
    }

    console.log("data: ", data);
}