import { useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";
import "./table.css";
import { FaUser } from "react-icons/fa";

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
            <table className="table_style">
                <thead>
                    <th key={0}>Paciente</th>
                    <th key={1}>Médico</th>
                    <th key={2}>Data e horário</th>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td> <div className="td-user-photo">{item?.paciente?.imagem?.url ? <img className="user-photo" src={item?.paciente?.imagem?.url} /> : <FaUser className="user-photo"/>} {item?.paciente?.nome}</div></td>
                            <td> <div className="td-user-photo">{item?.medico?.imagem?.url ? <img className="user-photo" src={item?.medico?.imagem?.url} /> : <FaUser className="user-photo"/>} {item?.medico?.nome} </div></td>
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