import { useEffect, useState } from "react";

export default function Doctor({data}) {
    const [nome, setNome] = useState(data.nome);
    const [email, setEmail] = useState(data.email);
    const [sexo, setSexo] = useState(data.sexo);
    const [cri, setCri] = useState(data.cri);
    const [dataNascimento, setDataNascimento] = useState(data.dataNascimento)
    const [especialidade, setEspecialidade] = useState(data.especialidade);
    const [cpf, setCpf] = useState(data.CPF);
    const [estadoCivil, setEstadoCivil] = useState(data.estadoCivil);
    
    useEffect( () => {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setCri(data.cri);
        setDataNascimento(data.dataNascimento)
        setEspecialidade(data.especialidade);
        setCpf(data.cpf);
        setEstadoCivil(data.estadoCivil);
    },[data] )
    

    function handleRestore() {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setCri(data.cri);
        setDataNascimento(data.dataNascimento)
        setEspecialidade(data.especialidade);
        setCpf(data.cpf);
        setEstadoCivil(data.estadoCivil);
    }

    function handleEdition() {
        console.log("editando");
    }

    console.log(nome)

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
                        <label>CRI:
                    <input type="text" name="cri" value={cpf} onChange={(e) => setCri(e.target.value)} required />
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