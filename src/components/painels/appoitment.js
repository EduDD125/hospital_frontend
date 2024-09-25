import { useEffect, useState } from "react";
import { tipo } from "../../hooks/getUserType";
import useEditData from "../../hooks/entities/editData";

export default function Appointment({data}) {
    
    const [idMedico, setIdMedico] = useState(data.idMedico);
    const [idPaciente, setIdPaciente] = useState(data.idPaciente);
    const [medico, setMedico] = useState("");
    const [paciente, setPaciente] = useState("");
    const [dataHorario, setDataHorario] = useState(data.dataHorario);
    const editData = useEditData();

   console.log(idMedico, idPaciente, dataHorario, medico, paciente);
    
    useEffect( () => {
        setIdMedico(data.idMedico);
        setIdPaciente(data.idPaciente);
        //setMedico(data.medico.nome);
        //setPaciente(data.paciente.nome);
        setDataHorario(data.dataHorario);
    },[data] )
    

    function handleRestore() {
        setIdMedico(data.idMedico);
        setIdPaciente(data.idPaciente);
        //setMedico(data.medico.nome);
        //setPaciente(data.paciente.nome);
        setDataHorario(data.dataHorario);
    }

    async function handleEdition(event) {
        event.preventDefault();

        const newConsultData = {idMedico, idPaciente, dataHorario, medico, paciente};
        console.log(newConsultData)
        const option = "consultas";
        const response = await editData(option, tipo(), data.id, newConsultData);
        console.log(response);
    }

    console.log("data: ", data);

    return(
        <div className="item__container">
            <div className="item__title">
                <h3>Dados Exame:</h3>
            </div>
            {data !== "" && data.medico && data.paciente? 
            <form onSubmit={(e) => handleEdition(e)}>
                <label>medico:
                    <input type="text" name="medico" required value={medico} onChange={(e) => setMedico(e.target.value)} />
                </label>

                <label>paciente:
                    <input type="email" name="paciente" required value={paciente} onChange={(e) => setPaciente(e.target.value)} />
                </label>

                <div className="button-area">
                    <button type="button" onClick={handleRestore}>restaurar</button>
                    <button type="submit">salvar edição</button>
                </div>
            </form>
            :
            <p>Clique em um item da tabela para detalha-lo.</p>
            }
        </div>
    );
}