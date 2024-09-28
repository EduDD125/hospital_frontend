import { useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";
import "./table.css";

export default function PacientTable ({data, setItem, option}) {
    const [tableItensList, setTableItensList] = useState([]);
    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        if(data && data.length > 0) {
            setAtributos(Object.keys(data[0]));
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
                    <th key={0}></th>
                    <th key={1}>Nome</th>
                    <th key={2}>CPF</th>
                    <th key={3}>Sexo</th>
                    <th key={4}>Estado Civil</th>
                    <th key={5}>Data de Nascimnento</th>
                    <th key={6}>Email</th>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={option} id={item.id} onDelete={handleDelete}/></td>
                            <td>{item.nome}</td>
                            <td>{item.CPF}</td>
                            <td>{item.sexo}</td>
                            <td>{item.estadoCivil}</td>
                            <td>{item.dataNascimento}</td>
                            <td>{item.email}</td>
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