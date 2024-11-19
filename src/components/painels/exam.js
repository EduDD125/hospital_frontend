import { refreshTableContext } from "../../contexts/appContext";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";
import { useContext, useEffect, useState } from "react";

export default function Exam({data, setData}) {
    const [id, setId] = useState(data.id);
    const [idMedico, setIdMedico] = useState(data.idMedico);
    const [idPaciente, setIdPaciente] = useState(data.idPaciente);
    const [medico, setMedico] = useState(data.idMedico);
    const [paciente, setPaciente] = useState(data.idPaciente);
    const [dataHorario, setDataHorario] = useState(data.dataHorario);
    const [resultado, setResultado] = useState(data.resultado);
    const {editData, loading, error, setError} = useEditData();

    const {refreshTable, setRefreshTable} = useContext(refreshTableContext)

    
    useEffect( () => {
        setId(data.id);
        setIdMedico(data.idMedico);
        setIdPaciente(data.idPaciente);
        if (data.medico) setMedico(data.medico.nome);
        if (data.paciente) setPaciente(data.paciente.nome);
        setResultado(data.resultado);
        setDataHorario(data.dataHorario);

    },[data] )
    

    function handleRestore() {
        setResultado(data.resultado);
    }

    async function handleEdition(event) {
        event.preventDefault();

        setError("");

        const newExamData = {resultado};
        console.log(newExamData)
        const option = "exames";
        const response = await editData(option, tipo(), data.id, newExamData);
        console.log("editado:", response);
        setRefreshTable(!refreshTable);
    }

    console.log("data: ", data);

    return(
        <div className="item__container">
            <div className="item__title">
                <h3>Dados Exame:</h3>
            </div>
            {data !== "" ? 
            <form onSubmit={(e) => handleEdition(e)}>
                <label>medico:
                    <input type="text" name="medico" required value={medico} readOnly />
                </label>

                <label>paciente:
                    <input type="email" name="paciente" required value={paciente} readOnly />
                </label>

                <label>resultado:
                    <input type="text" name="resultado" value={resultado} onChange={(e) => setResultado(e.target.value)} required />
                </label>

                        
                {error && <p>Não doi possível editar os dados</p>}
                        
                <div className="button-area">
                    <button type="button" onClick={handleRestore}>restaurar</button>
                    {loading ?
                        <button readOnly>Editando...</button>
                    :
                        <button type="submit">salvar edição</button>
                    }
                </div>
            </form>
            :
            <p>Clique em um item da tabela para detalha-lo.</p>
            }
        </div>
    );
}