import { useEffect, useState } from "react";
import DeleteButton from "../buttons/deleteButton";
import "./table.css";

export default function DoctorTable ({data, setItem, option}) {
    const [tableItensList, setTableItensList] = useState([]);
    const [atributos, setAtributos] = useState([]);

    useEffect(() => {
        if(data && data.length > 0) {
            setAtributos(Object.keys(data[0]));
            setTableItensList(data);
        }
    },[data])

    

    function formatDateToDDMMYYYY(date) {
        // Expressão regular para verificar o formato "dd/mm/yyyy"
        const ddmmyyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    
        // Se a data já estiver no formato "dd/mm/yyyy", retorne-a como está
        if (ddmmyyyyRegex.test(date)) {
            return date;
        }
    
        // Caso contrário, formate a data do formato ISO "yyyy-mm-dd" para "dd/mm/yyyy"
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    }
    

    function handleDelete(id) {
        setTableItensList(prevItems => prevItems.filter(item => item.id !== id));
        console.log(tableItensList.length);

    }

    if (Array.isArray(data) && data.length > 0) {
        return(
            <table className="table_style">
                <thead>
                    <tr>
                        <th key={0}></th>
                        <th key={1}>Nome</th>
                        <th key={2}>CRI</th>
                        <th key={3}>Sexo</th>
                        <th key={4}>Especialidade</th>
                        <th key={5}>Data de Nascimnento</th>
                        <th key={6}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={option} id={item.id} onDelete={handleDelete}/></td>
                            <td>{item.nome}</td>
                            <td>{item.CRI}</td>
                            <td>{item.sexo}</td>
                            <td>{item.especialidade}</td>
                            <td>{formatDateToDDMMYYYY(item.dataNascimento)}</td>
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