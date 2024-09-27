import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import {tipo} from "../../hooks/getUserType"

export default function UserData({data}) {
    const [nome, setNome] = useState(data.nome);
    const [email, setEmail] = useState(data.email);
    const [sexo, setSexo] = useState(data.sexo);
    const [dataNascimento, setDataNascimento] = useState(data.dataNascimento)
    const [CPF, setCpf] = useState(data.CPF);
    const [CRI, setCRI] = useState(data.CRI);
    const [estadoCivil, setEstadoCivil] = useState(data.estadoCivil);
    const [especialidade, setEspecialidade] = useState(data.especialidade);
    const {editData, loading, error} = useEditData();
    
    useEffect( () => {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(data.dataNascimento)
        setCpf(data.CPF);
        setCRI(data.CRI);
        setEstadoCivil(data.estadoCivil);
        setEspecialidade(data.especialidade)
    },[data] )
    

    function handleRestore() {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(data.dataNascimento)
        setCpf(data.CPF);
        setCRI(data.CRI);
        setEstadoCivil(data.estadoCivil);
        setEspecialidade(data.especialidade)
    }

    async function handleEdition(event) {
        event.preventDefault();
        console.log(data.dataNascimento)
        console.log(dataNascimento)

        let newUserData = {};
        if (tipo() == "paciente") newUserData = {nome, email, sexo, dataNascimento, CPF, estadoCivil};
        if (tipo() == "medico") newUserData = {nome, email, sexo, dataNascimento, CRI, especialidade};

        const option = `dadosPessoais`;

        const response = await editData(option, tipo(), data.id, newUserData);
        console.log(response);
    }

    console.log("data: ", data);

    return(
        <div className="item__container">
            <div className="item__title">
                <h3>Dados Pessoais</h3>
            </div>
            {data == "" ? 
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
                {tipo() == "medico" && 
                    <>
                        <label>CRI:
                            <input type="text" name="CRI" value={CRI} onChange={(e) => setCpf(e.target.value)} required />
                        </label>

                        <label>especialidad:
                            <input type="text" name="especialidade" value={especialidade} onChange={(e) => setEstadoCivil(e.target.value)} required />
                        </label>
                    </>
                }
                {tipo() == "paciente" && 
                    <>
                        <label>CPF:
                            <input type="text" name="cpf" value={CPF} onChange={(e) => setCpf(e.target.value)} required />
                        </label>

                        <label>estado civil:
                            <input type="text" name="estado-civil" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} required />
                        </label>
                    </>
                }   

                {error && <p className="error-message">Não doi possível editar os dados</p>}
                        
                <div className="button-area">
                    <button type="button" onClick={handleRestore}>restaurar</button>
                    {!loading ?
                            <button type="submit" >salvar edição</button>
                        :
                            <button type="submit" readonly>Carregando...</button>
                        }
                </div>
            </form>
            :
            <p>Clique em um item da tabela para detalha-lo.</p>
            }
        </div>
    );
}