import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import {tipo} from "../../hooks/getUserType"

export default function Pacient({data}) {
    const [nome, setNome] = useState(data.nome);
    const [email, setEmail] = useState(data.email);
    const [sexo, setSexo] = useState(data.sexo);
    const [dataNascimento, setDataNascimento] = useState(data.dataNascimento)
    const [CPF, setCpf] = useState(data.CPF);
    const [estadoCivil, setEstadoCivil] = useState(data.estadoCivil);
    const editData = useEditData();
    
    useEffect( () => {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(data.dataNascimento)
        setCpf(data.CPF);
        setEstadoCivil(data.estadoCivil);
    },[data] )
    

    function handleRestore() {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(data.dataNascimento)
        setCpf(data.CPF);
        setEstadoCivil(data.estadoCivil);
    }

    async function handleEdition(event) {
        event.preventDefault();
        console.log(data.dataNascimento)
        console.log(dataNascimento)
        const newPacientData = {nome, email, sexo, dataNascimento, CPF, estadoCivil};
        const option = "pacientes";
        const response = await editData(option, tipo(), data.id, newPacientData);
        console.log(response);
    }

    console.log("data: ", data);

    return(
        <div className="item__container">
            <div className="item__title">
                <h3>Dados pacientes</h3>
            </div>
            {data !== "" ? 
            <form onSubmit={(e) => handleEdition(e)}>
                <label>nome:
                    <input type="text" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                </label>

                <label>email:
                    <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>sexo:
                    <select name="sexo" id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="feminino">feminino</option>
                        <option value="masculino">masculino</option>
                    </select>
                </label>

                <label>data de nascimento:
                    <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </label>
                        <label>CPF:
                    <input type="text" name="cpf" value={CPF} onChange={(e) => setCpf(e.target.value)} required />
                </label>

                <label>estado civil:
                    <input type="text" name="estado-civil" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} required />
                </label>
                        
                <div className="button-area">
                    <button type="button" onClick={handleRestore}>restaurar</button>
                    <button type="submit">salvar edição</button>
                </div>
            </form>
            :
            <p>Clique em um item da tabela para detalha-lo.</p>
            }
        </div>
    );
}