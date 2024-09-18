import { useEffect, useState } from "react";

export default function Appointment({data}) {
    const [medico, setMedico] = useState(data.idMedico);
    const [paciente, setPaciente] = useState(data.idPaciente);
    
    useEffect( () => {
        setMedico(data.idMedico);
        setPaciente(data.idPaciente);
    },[data] )
    

    function handleRestore() {
        setMedico(data.idMedico);
        setPaciente(data.idPaciente);
    }

    function handleEdition() {
        console.log("editando");
    }

    console.log("data: ", data);

    return(
        <div className="item__container">
            <div className="item__title">
                <h3>Dados Exame:</h3>
            </div>
            {data != "" ? 
            <form onSubmit={handleEdition}>
                <label>medico:
                    <input type="text" name="medico" required value={medico} onChange={(e) => setMedico(e.target.value)} />
                </label>

                <label>paciente:
                    <input type="email" name="paciente" required value={paciente} onChange={(e) => setPaciente(e.target.value)} />
                </label>
            </form>
            :
            <p>Clique em um item da tabela para detalha-lo.</p>
            }
        </div>
    );
}