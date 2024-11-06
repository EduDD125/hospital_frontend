import { useContext, useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";
import "./table.css";
import { refreshTableContext } from "../../contexts/appContext";

export default function ExamTable ({data, setItem, option}) {
    const [tableItensList, setTableItensList] = useState([]);
    const [refreshTable, setRefreshTable] = useContext(refreshTableContext)

    useEffect(() => {
        if(data && data.length > 0) {
            setTableItensList(data);
        }
    },[data])

    function handleDelete(id) {
        setTableItensList(prevItems => prevItems.filter(item => item.id !== id));
        console.log(tableItensList.length);

    }

    if (Array.isArray(data) && data.length > 0) {
        return(
            <table className="table_style">
                <thead>
                    <th key={0}>Nome do Exame</th>
                    <th key={1}>Paciente</th>
                    <th key={2}>Medico</th>
                    <th key={3}>Data do exame</th>
                    <th key={3}>Resultado</th>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item.nomeExame}</td>
                            <td>{(item.paciente && item.paciente.nome)&& item.paciente.nome}</td>
                            <td>{(item.medico && item.medico.nome) && item.medico.nome}</td>
                            <td>{item.dataHorario}</td>
                            <td>{item.resultado}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        );
    }

    return (
        <p>Não há {option} no sistema.</p>
    )
}