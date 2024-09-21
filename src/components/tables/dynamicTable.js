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

    if (Array.isArray(data) && data.length > 0)
        return(
            <table>
                <thead>
                    {atributos.map( (atributo, index) => (
                        <>
                            {atributo === "id" ? <></> : <th key={index++}>{atributo}</th>}
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
                                    <td key={index++}>{atributo}</td>
                                    }
                                </>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
        );

    return (
        <p>Não há {option} no sistema.</p>
    )
}