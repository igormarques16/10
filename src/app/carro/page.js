"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function carroPage() {
  const [carro, setcarro] = useState([]);

  // Carrega as carro quando a tela é acessada
  useEffect(() => {
    // Busca as carro do localStorage, se não existir, inicia uma lista vazia
    const carroLocalStorage = JSON.parse(localStorage.getItem("carro")) || [];
    setcarro(carroLocalStorage);
    console.log(carroLocalStorage);
  }, []);

  // Função para exclusão de uma carro
  function excluir(carro) {
    if (window.confirm(`Deseja realmente excluir a carro ${carro.nome}?`)) {
      const novaLista = carro.filter((item) => item.id !== carro.id);
      localStorage.setItem("carro", JSON.stringify(novaLista));
      setcarro(novaLista);
      alert("carro excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"carro"}>
      <div className="text-end mb-2">
        <Button href="/carro/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as carro */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Modelos</th>
            <th>Cor</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {carro.map((carro) => (
            <tr key={carro.id}>
              <td>{carro.carro}</td>
              <td>{carro.Cor}</td>
              <td>{carro.Ano}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/carro/form?id=${carro.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(carro)}>
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
