import { useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";

export default function DynamicTable({data, setItem, option}) {
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
        if (option !== "exames" && option !== "consultas")
            return(
                <table>
                    <thead>
                        {atributos.map( (atributo, index) => (
                            <>
                                {typeof atributo !== "string" || atributo === "id"  ? <></> : <th key={index++}>{atributo}</th>}
                            </>
                        ))}
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} onClick={() => setItem(item)}>
                                {Object.values(item).map((atributo, index) => (
                                    <>
                                        {index === 0 ? 
                                        <td><DeleteButton entityType={option} id={item.id} onDelete={handleDelete}/></td>
                                        :
                                        <>
                                            {typeof atributo === "string" && <td key={index++}>{atributo}</td>}
                                        </>
                                        }
                                    </>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
            );

        return(
            <table>
                <thead>
                    <th key={0}></th>
                    <th key={1}>Data</th>
                    <th key={2}>Medico</th>
                    <th key={3}>Paciente</th>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={option} id={item.id} onDelete={handleDelete}/></td>
                            <td>{item.dataHorario}</td>
                            <td>{item.medico.nome}</td>
                            <td>{item.paciente.nome}</td>
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