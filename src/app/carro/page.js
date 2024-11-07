"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function carrosPage() {
  const [carros, setcarros] = useState([]);

  // Carrega as carros quando a tela é acessada
  useEffect(() => {
    // Busca as carros do localStorage, se não existir, inicia uma lista vazia
    const carrosLocalStorage = JSON.parse(localStorage.getItem("carros")) || [];
    setcarros(carrosLocalStorage);
    console.log(carrosLocalStorage);
  }, []);

  // Função para exclusão de uma carro
  function excluir(carro) {
    if (window.confirm(`Deseja realmente excluir a carro ${carro.nome}?`)) {
      const novaLista = carros.filter((item) => item.id !== carro.id);
      localStorage.setItem("carros", JSON.stringify(novaLista));
      setcarros(novaLista);
      alert("carro excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Carro"}>
      <div className="text-end mb-2">
        <Button href="/carros/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as carros */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Modelos</th>
            <th>Cor</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {carros.map((carro) => (
            <tr key={carro.id}>
              <td>{carro.Modelos}</td>
              <td>{carro.Cor}</td>
              <td>{carro.Ano}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button className="me-2" href={`/carros/form?id=${carro.id}`}>
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
