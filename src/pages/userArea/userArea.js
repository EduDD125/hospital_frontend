import { useEffect, useState } from "react";
import Pacient from "../../components/painels/pacient";
import Doctor from "../../components/painels/doctor";
import Exam from "../../components/painels/exam";
import Appointment from "../../components/painels/appoitment";
import UserNavbar from "../../components/navbars/userNavbar/userNavbar";
import DynamicTable from "../../components/tables/dynamicTable";
import useFetchAllData from "../../hooks/entities/fetchAllData"

export default function UserArea() {
    const fetchAllData = useFetchAllData();
    const [option, setOption] = useState("");
    const [painel, setPainel] = useState(<></>); 
    const tipo = "medico"
    const [item, setItem] = useState("");
    const [data, setData] = useState(null);


    useEffect(() => {
      async function fetchData() {
          if(option) {
              const result = await fetchAllData(`/fakeData/${option}.json`);
              setData(result);
          }
      }

      fetchData(); // Chama a função de busca
  
      setItem("");
      switch (option) {
        case "exames": setPainel(<Exam data={item}/>);
          break;
        case "consultas": setPainel(<Appointment data={item}/>);
          break;
        case "pacientes": setPainel(<Pacient data={item}/>);
          break;
        case "medicos": setPainel(<Doctor data={item}/>);
          break;
        }

    },[option])

    console.log("item: ", item)

    useEffect(() => {
      switch (option) {
        case "exames": setPainel(<Exam data={item}/>);
          break;
        case "consultas": setPainel(<Appointment data={item}/>);
          break;
        case "pacientes": setPainel(<Pacient data={item}/>);
          break;
        case "medicos": setPainel(<Doctor data={item}/>);
          break;
        }
    },[item])


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
                          {data && 
                            <>
                              <DynamicTable data={data} setItem={setItem} />
                              {painel}
                            </>
                          }
                        </>
                    }
                    
                  </>
                }
            </main>
        </div>
    );
}