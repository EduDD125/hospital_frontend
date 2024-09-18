import { useEffect, useState } from "react";
import Pacient from "../../components/painels/pacient";
import Doctor from "../../components/painels/doctor";
import UserNavbar from "../../components/navbars/userNavbar/userNavbar";
import DynamicTable from "../../components/tables/dynamicTable";

export default function UserArea() {
    const [option, setOption] = useState("");
    const [painel, setPainel] = useState(<></>);
    const data = [{
      "id": "1",
      "nome": "Ana Clara Silva",
      "CPF": "123.456.789-00",
      "sexo": "feminino",
      "dataNascimento": "1990-05-14",
      "estadoCivil": "solteiro",
      "email": "ana.clara@example.com",
      "senha": "senhaSegura123"
    }]
    const tipo = "medico"
    const [item, setItem] = useState("");

    console.log("option: ", option);

    useEffect(() => {
      setItem("");
      switch (option) {
        case "exames": setPainel(<>exame</>);
          break;
        case "consultas": setPainel(<>consultas</>);
          break;
        case "pacientes": setPainel(<Pacient data={data}/>);
          break;
        case "medicos": setPainel(<Doctor data={data}/>);
          break;
      }

    },[option])



    return (
        <div>
            <UserNavbar tipo={tipo} setOption={setOption}/>
            <main>
                {!option ?
                    <p>Escolha uma das opções na barra de navegação.</p>
                  :
                    <>
                    {option === "dadosPessoais" ?
                        <>
                          <p>Dados pessoais</p>
                        </>
                        :
                        <>
                          <DynamicTable data={data} setItem={setItem} />
                          {item && painel}
                        </>
                    }
                    
                  </>
                }
            </main>
        </div>
    );
}