import { useEffect, useState } from "react";
import Pacient from "../../components/painels/pacient";
import Doctor from "../../components/painels/doctor";
import Exam from "../../components/painels/exam";
import Appointment from "../../components/painels/appoitment";
import UserNavbar from "../../components/navbars/userNavbar/userNavbar";
import DynamicTable from "../../components/tables/dynamicTable";
import useFetchData from "../../hooks/entities/fetchData"
import ControlPainel from "../../components/painels/controlPainel";

export default function UserArea() {
    const fetchData = useFetchData();
    const [option, setOption] = useState("");
    const [painel, setPainel] = useState(<></>); 
    const [item, setItem] = useState("");
    const [data, setData] = useState("");
    const tipo = localStorage.getItem("role")
    const userId = localStorage.getItem("id");


    useEffect(() => {
      async function fetchDataFromHook() {
          if(option) {
              const result = await fetchData(option, tipo, userId);
              setData(result);
          }
      }

      fetchDataFromHook(); // Chama a função de busca
  
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
        case "": setPainel("");
          break
        }

    },[option])

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
            <UserNavbar tipo={tipo} setOption={setOption} option={option}/>
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
                          {option==="exames" || option==="consultas"  ? <ControlPainel option={option}/> : <></>}
                          <DynamicTable data={data} setItem={setItem} option={option} />
                          {Array.isArray(data) && data.length> 0 && painel}
                        </>
                    }
                    
                  </>
                }
            </main>
        </div>
    );
}