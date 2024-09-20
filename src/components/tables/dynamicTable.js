import { useEffect, useState } from "react";

export default function DynamicTable({data, setItem, option}) {

    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        if(data && data.length > 0) {
            setAtributos(Object.keys(data[0]));
        }
    },[data])

    if (Array.isArray(data) && data.length > 0)
        return(
            <table>
                <thead>
                    {atributos.map( (atributo, index) => (
                        <th key={index}>{atributo}</th>
                    ))}
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            {Object.values(item).map((atributo, index) => (
                                <td key={index}>{atributo}</td>
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