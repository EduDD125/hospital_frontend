import { useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";

export default function ExamTable ({data, setItem, option}) {
    const [tableItensList, setTableItensList] = useState([]);

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
            <table>
                <thead>
                    <th key={0}></th>
                    <th key={1}>Nome do Exame</th>
                    <th key={1}>Paciente</th>
                    <th key={2}>Medico</th>
                    <th key={3}>Data de Nascimento</th>
                    <th key={3}>Resultado</th>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={option} id={item.id} onDelete={handleDelete}/></td>
                            <td>{item.nomeExame}</td>
                            <td>{item.paciente.nome}</td>
                            <td>{item.medico.nome}</td>
                            <td>{item.dataNascimento}</td>
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