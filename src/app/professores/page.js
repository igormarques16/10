"use client";

import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function ProfessoresPage() {
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    const professoresLocalStorage = JSON.parse(localStorage.getItem("professores")) || [];
    setProfessores(professoresLocalStorage);
    console.log(professoresLocalStorage);
  }, []);

  function excluir(professor) {
    if (window.confirm(`Deseja realmente excluir o professor ${professor.nome}?`)) {
      const novaLista = professores.filter((item) => item.id !== professor.id);
      localStorage.setItem("professores", JSON.stringify(novaLista));
      setProfessores(novaLista);
      alert("Avaliação excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Feedback"}>
      <div className="text-end mb-2">
        <Button href="/professores/form">
          <FaPlusCircle /> Envie seu Feedback
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Avaliação</th>
            <th>Dicas</th>
            <th>  </th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.nome}</td>
              <td>{professor.avaliacao}</td>
              <td>{professor.dicas}</td>
              <td className="text-center">
                <Button
                  className="me-2"
                  href={`/professores/form?id=${professor.id}`}
                >
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(professor)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
