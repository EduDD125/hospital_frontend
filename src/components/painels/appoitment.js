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

    return(
        <div className="item__container">
            <div className="item__title">
                <h3>Dados Exame:</h3>
            </div>
            {data !== "" && data.medico && data.paciente? 
            <form onSubmit={(e) => handleEdition(e)}>
                <label>medico:
                    <input type="text" name="medico" required value={medico} readOnly />
                </label>

                <label>paciente:
                    <input type="text" name="paciente" required value={paciente} readOnly />
                </label>

                <label>data:
                    <input type="text" name="dataHorario" required value={dataHorario} onChange={(e) => setPaciente(e.target.value)} />
                </label>

                        
                {error && <p>Não doi possível editar os dados</p>}
                        
                <div className="button-area">
                {tipo() &&
                   <> 
                        <button type="button" onClick={handleRestore}>restaurar</button>
                        {loading ?
                            <button readonly>Editando...</button>
                        :
                            <button type="submit">salvar edição</button>
                        }
                    </>}
                </div>
            </form>
            :
            <p>Clique em um item da tabela para detalha-lo.</p>
            }
        </div>
    );
}