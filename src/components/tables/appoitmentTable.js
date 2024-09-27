import { useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";
import tipo from "../../hooks/getUserType"

export default function AppoitmentTable ({data, setItem, option}) {
    const [tableItensList, setTableItensList] = useState([]);
    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        if(data && data.length > 0) {
            setTableItensList(data);
        }
    },[data])

    function handleDelete(id) {
        setTableItensList(prevItems => prevItems.filter(item => item.id !== id));
        console.log(tableItensList.length);

    }
    console.log("data: ", data);

    if (Array.isArray(data) && data.length > 0) {
        return(
            <table>
                <thead>
                    {tipo() == "admin" &&  <th key={0}></th>}
                    <th key={1}>Paciente</th>
                    <th key={2}>Médico</th>
                    <th key={3}>Data e horário</th>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            {tipo() == "admin" && <td><DeleteButton entityType={option} id={item.id} onDelete={handleDelete}/></td>}
                            <td>{(item.paciente && item.paciente.nome)&& item.paciente.nome}</td>
                            <td>{(item.medico && item.medico.nome) && item.medico.nome}</td>
                            <td>{item.dataHorario&& item.dataHorario}</td>
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