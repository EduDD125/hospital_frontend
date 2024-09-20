import { useEffect, useState } from "react";

export default function Doctor({data}) {
    const [nome, setNome] = useState(data.nome);
    const [sexo, setSexo] = useState(data.sexo);
    const [cri, setCri] = useState(data.CRI);
    const [dataNascimento, setDataNascimento] = useState(data.dataNascimento)
    const [especialidade, setEspecialidade] = useState(data.especialidade);
    
    useEffect( () => {
        setNome(data.nome);
        setSexo(data.sexo);
        setCri(data.CRI);
        setEspecialidade(data.especialidade);
    },[data] )
    

    function handleRestore() {
        setNome(data.nome);
        setSexo(data.sexo);
        setCri(data.CRI);
        setDataNascimento(data.dataNascimento)
        setEspecialidade(data.especialidade);
    }

    function handleEdition() {
        console.log("editando");
    }

    return(
        <div className="item__container">
            <div className="item__title">
                <h3>Dados pacientes</h3>
            </div>
            {data != "" ? 
            <form onSubmit={handleEdition}>
                <label>nome:
                    <input type="text" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
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
                        <label>CRI:
                    <input type="text" name="cri" value={cri} onChange={(e) => setCri(e.target.value)} required />
                </label>

                <label>especialidade:
                    <input type="text" name="especialidade" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} required />
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