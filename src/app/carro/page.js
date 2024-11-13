"use client";

import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function carroPage() {
  const [carros, setcarros] = useState([]);


  useEffect(() => {

    const carroLocalStorage = JSON.parse(localStorage.getItem("carro")) || [];
    setcarros(carroLocalStorage);
    console.log(carroLocalStorage);
  }, []);


  function excluir(carro) {
    if (window.confirm(`Deseja realmente excluir a carro ${carro.carro}?`)) {
      const novaLista = carros.filter((item) => item.id !== carro.id);
      localStorage.setItem("carro", JSON.stringify(novaLista));
      setcarros(novaLista);
      alert("carro excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"CADASTRE SEU CARRO:"}>
      <div className="text-end mb-2">
        <Button href="/carro/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Modelos</th>
            <th>Ano</th>
            <th>Marca</th>
            <th>Cor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carros.map((carros) => (
            <tr key={carros.id}>
              <td>{carros.nome}</td>
              <td>{carros.descricao}</td>
              <td>{carros.carroEditada}</td>
              <td>{carros.cor}</td>
              <td className="text-center">

                <Button className="me-2" href={`/carro/form?id=${carros}`}>
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
