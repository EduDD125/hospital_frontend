import UserNavbar from "../../components/navbars/userNavbar/userNavbar";
import DynamicTable from "../../components/tables/dynamicTable";

export default function UserArea() {

    const data = [
        {
          "id": "1",
          "nome": "Ana Clara Silva",
          "CPF": "123.456.789-00",
          "sexo": "feminino",
          "dataNascimento": "1990-05-14",
          "estadoCivil": "solteiro",
          "email": "ana.clara@example.com",
          "senha": "senhaSegura123"
        },
        {
          "id": "2",
          "nome": "João Pedro Oliveira",
          "CPF": "987.654.321-11",
          "sexo": "masculino",
          "dataNascimento": "1985-10-22",
          "estadoCivil": "casado",
          "email": "joao.pedro@example.com",
          "senha": "senhaForte456"
        },
        {
          "id": "3",
          "nome": "Mariana Costa",
          "CPF": "456.123.789-22",
          "sexo": "feminino",
          "dataNascimento": "1992-03-30",
          "estadoCivil": "divorciado",
          "email": "mariana.costa@example.com",
          "senha": "marianaSenha789"
        },
        {
          "id": "4",
          "nome": "Lucas Ferreira",
          "CPF": "654.321.987-33",
          "sexo": "masculino",
          "dataNascimento": "1998-12-15",
          "estadoCivil": "solteiro",
          "email": "lucas.ferreira@example.com",
          "senha": "lucasSenha012"
        },
        {
          "id": "5",
          "nome": "Beatriz Rocha",
          "CPF": "321.654.987-44",
          "sexo": "feminino",
          "dataNascimento": "2000-06-21",
          "estadoCivil": "solteiro",
          "email": "beatriz.rocha@example.com",
          "senha": "beatrizSenha345"
        },
        {
          "id": "6",
          "nome": "Mateus Lima",
          "CPF": "111.222.333-55",
          "sexo": "masculino",
          "dataNascimento": "1995-08-17",
          "estadoCivil": "casado",
          "email": "mateus.lima@example.com",
          "senha": "mateusSenha678"
        },
        {
          "id": "7",
          "nome": "Julia Martins",
          "CPF": "222.333.444-66",
          "sexo": "feminino",
          "dataNascimento": "1988-04-05",
          "estadoCivil": "solteiro",
          "email": "julia.martins@example.com",
          "senha": "juliaSenha901"
        },
        {
          "id": "8",
          "nome": "Paulo Souza",
          "CPF": "333.444.555-77",
          "sexo": "masculino",
          "dataNascimento": "1982-09-10",
          "estadoCivil": "divorciado",
          "email": "paulo.souza@example.com",
          "senha": "pauloSenha234"
        },
        {
          "id": "9",
          "nome": "Carla Gomes",
          "CPF": "444.555.666-88",
          "sexo": "feminino",
          "dataNascimento": "1991-11-23",
          "estadoCivil": "casado",
          "email": "carla.gomes@example.com",
          "senha": "carlaSenha567"
        },
        {
          "id": "10",
          "nome": "Renato Almeida",
          "CPF": "555.666.777-99",
          "sexo": "masculino",
          "dataNascimento": "1986-01-02",
          "estadoCivil": "solteiro",
          "email": "renato.almeida@example.com",
          "senha": "renatoSenha890"
        },
        {
          "id": "11",
          "nome": "Fernanda Ribeiro",
          "CPF": "666.777.888-00",
          "sexo": "feminino",
          "dataNascimento": "1999-07-19",
          "estadoCivil": "solteiro",
          "email": "fernanda.ribeiro@example.com",
          "senha": "fernandaSenha123"
        },
        {
          "id": "12",
          "nome": "Carlos Eduardo Santos",
          "CPF": "777.888.999-11",
          "sexo": "masculino",
          "dataNascimento": "1987-05-09",
          "estadoCivil": "casado",
          "email": "carlos.santos@example.com",
          "senha": "carlosSenha456"
        },
        {
          "id": "13",
          "nome": "Patricia Lima",
          "CPF": "888.999.111-22",
          "sexo": "feminino",
          "dataNascimento": "1993-02-11",
          "estadoCivil": "viuvo",
          "email": "patricia.lima@example.com",
          "senha": "patriciaSenha789"
        },
        {
          "id": "14",
          "nome": "Felipe Moreira",
          "CPF": "999.111.222-33",
          "sexo": "masculino",
          "dataNascimento": "1989-08-18",
          "estadoCivil": "divorciado",
          "email": "felipe.moreira@example.com",
          "senha": "felipeSenha012"
        },
        {
          "id": "15",
          "nome": "Amanda Sousa",
          "CPF": "111.222.444-55",
          "sexo": "feminino",
          "dataNascimento": "1994-12-01",
          "estadoCivil": "solteiro",
          "email": "amanda.sousa@example.com",
          "senha": "amandaSenha345"
        },
        {
          "id": "16",
          "nome": "Gabriel Cunha",
          "CPF": "222.444.555-66",
          "sexo": "masculino",
          "dataNascimento": "1996-03-25",
          "estadoCivil": "solteiro",
          "email": "gabriel.cunha@example.com",
          "senha": "gabrielSenha678"
        },
        {
          "id": "17",
          "nome": "Marcela Pereira",
          "CPF": "333.555.666-77",
          "sexo": "feminino",
          "dataNascimento": "1983-10-12",
          "estadoCivil": "casado",
          "email": "marcela.pereira@example.com",
          "senha": "marcelaSenha901"
        },
        {
          "id": "18",
          "nome": "André Melo",
          "CPF": "444.666.777-88",
          "sexo": "masculino",
          "dataNascimento": "1990-09-07",
          "estadoCivil": "solteiro",
          "email": "andre.melo@example.com",
          "senha": "andreSenha234"
        },
        {
          "id": "19",
          "nome": "Roberta Batista",
          "CPF": "555.777.888-99",
          "sexo": "feminino",
          "dataNascimento": "1997-11-03",
          "estadoCivil": "divorciado",
          "email": "roberta.batista@example.com",
          "senha": "robertaSenha567"
        },
        {
          "id": "20",
          "nome": "Leonardo Cardoso",
          "CPF": "666.888.999-00",
          "sexo": "masculino",
          "dataNascimento": "1991-04-29",
          "estadoCivil": "casado",
          "email": "leonardo.cardoso@example.com",
          "senha": "leonardoSenha890"
        }
      ]
      
    //const tipo = localStorage.getItem("tipo");
    const tipo = "paciente"
    const acao = "lista_pacientes"

    return (
        <div>
            <UserNavbar tipo={tipo}/>
            <DynamicTable data={data} />
        </div>
    );
}