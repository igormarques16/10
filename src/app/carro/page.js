"use client";

import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function carroPage() {
  const [carros, setcarros] = useState([]);

  
  useEffect(() => {
    // Busca as carro do localStorage, se não existir, inicia uma lista vazia
    const carroLocalStorage = JSON.parse(localStorage.getItem("carro")) || [];
    setcarros(carroLocalStorage);
    console.log(carroLocalStorage);
  }, []);

  // Função para exclusão de uma carro
  function excluir(carro) {
    if (window.confirm(`Deseja realmente excluir a carro ${carro.carro}?`)) {
      const novaLista = carros.filter((item) => item.id !== carro.id);
      localStorage.setItem("carros", JSON.stringify(novaLista));
      setcarros(novaLista);
      alert("carro excluídO com sucesso!");
    }
  }

  return (
    <Pagina titulo={"CADASTRE SEU CARRO:"}>
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
          {carros.map((carros) => (
            <tr key={carros.id}>
              <td>{carros.carro}</td>
              <td>{carros.Cor}</td>
              <td>{carros.Ano}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/carro/form?id=${carros.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(carros)}>
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
