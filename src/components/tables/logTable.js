import { useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";
import "./table.css";

export default function LogTable ({data, setItem, option}) {
    const [tableItensList, setTableItensList] = useState([]);
    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        if(data && data.length > 0) {
            setAtributos(Object.keys(data[0]));
            setTableItensList(data);
        }
    },[data])

    if (Array.isArray(data) && data.length > 0) {
        return(
            <table className="table_style">
                <thead>
                    <th key={1}>id</th>
                    <th key={1}>nome</th>
                    <th key={1}>tipo</th>
                    <th key={2}>data</th>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.dataHorario}</td>
                            <td>{item.role}</td>
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