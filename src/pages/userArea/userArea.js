import { useEffect, useState } from "react";
import Pacient from "../../components/painels/pacient";
import Doctor from "../../components/painels/doctor";
import Exam from "../../components/painels/exam";
import Appointment from "../../components/painels/appoitment";
import UserNavbar from "../../components/navbars/userNavbar/userNavbar";
import useFetchData from "../../hooks/entities/fetchData"
import ControlPainel from "../../components/painels/controlPainel";
import ExamTable from "../../components/tables/examTable";
import DoctorTable from "../../components/tables/doctorTable";
import PacientTable from "../../components/tables/pacientTable";
import AppoitmentTable from "../../components/tables/appoitmentTable";
import UserData from "../../components/painels/userData";
import LogTable from "../../components/tables/logTable";
import { Circles } from 'react-loading-icons'

export default function UserArea() {
    const {fetchData, loading} = useFetchData();
    const [option, setOption] = useState("");
    const [painel, setPainel] = useState(<></>); 
    const [item, setItem] = useState("");
    const [data, setData] = useState("");
    const tipo = localStorage.getItem("role")
    const userId = localStorage.getItem("id");


    useEffect(() => {
      setData([]);
      console.log(option, tipo, userId)
      async function fetchDataFromHook() {
          if(option) {
              const result = await fetchData(option, tipo, userId);
              setData(result);
          }
      }

      fetchDataFromHook(); // Chama a função de busca
  
      setItem("");
      switch (option) {
        case "exames":
          if(tipo === "paciente" || tipo === "medico") break;
          setPainel(<Exam data={item}/>);
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
                {loading ?
                    <Circles />
                  :
                    <>
                        {!option ?
                            <p>Escolha uma das opções na barra de navegação.</p>
                          :
                            <>
                              {(option==="exames" || option==="consultas") && tipo === "admin"  ? <ControlPainel option={option}/> : <></>}


                              {option === "exames" && <ExamTable data={data} option={option} setItem={setItem}/>}
                              {option === "consultas" && <AppoitmentTable data={data} option={option} setItem={setItem}/>}
                              {option === "medicos" && <DoctorTable data={data} option={option} setItem={setItem}/>}
                              {option === "pacientes" && <PacientTable data={data} option={option} setItem={setItem}/>}
                              {option === "logs" && <LogTable data={data} option={option} setItem={setItem}/>}
                              {option === "dadosPessoais" && <UserData data={data}/>}

                              {Array.isArray(data) && data.length> 0 && painel}
                            
                            </>
                        }
                     </>
                  }
            </main>
        </div>
    );
}