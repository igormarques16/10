"use client";



import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function trabalhoPage() {
  const [trabalhos, settrabalhos] = useState([]);


  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const trabalhosLocalStorage = JSON.parse(localStorage.getItem("trabalhos")) || [];

    const trabalhoLocalStorage = JSON.parse(localStorage.getItem("trabalhos")) || [];

    settrabalhos(trabalhoLocalStorage);

  }, []);
  const excluir = (trabalho) => {

    if (window.confirm(`Deseja realmente excluir o trabalho ${trabalho.trabalho}?`)) {

      const novaLista = trabalhos.filter((item) => item.id !== trabalho.id);

      localStorage.setItem("trabalhos", JSON.stringify(novaLista));

      settrabalhos(novaLista);
      alert("trabalho excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Ordens de servico"}>
      <div className="text-end mb-2">
        <Button href="/trabalho/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os trabalho */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mecanico:</th>
            <th>servico:</th>
            <th>Valor:</th>


          </tr>
        </thead>
        <tbody>
          {trabalhos.map((trabalhos) => (

            <tr key={trabalhos.id}>

              <td>{trabalhos.mecanico}</td>
              <td>{trabalhos.servico}</td>
              <td>{trabalhos.valor}</td>


              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/trabalhos/form?id=${trabalhos.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(trabalhos)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </Pagina>
  );
}
