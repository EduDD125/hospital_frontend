import { useEffect, useState } from "react";

export default function DynamicTable({data}) {

    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        if(data.length > 0) {
            setAtributos(Object.keys(data[0]));
        }
    },[data])

    console.log(data);

    return(
        <table>
            <thead>
                {atributos.map( (atributo, index) => (
                    <th key={index}>{atributo}</th>
                ))}
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((atributo, index) => (
                            <td key={index}>{atributo}</td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>
    );
}