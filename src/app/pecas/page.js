"use client";
import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function pecasPage() {
  const [pecas, setpecas] = useState([]);

  useEffect(() => {
    const pecaLocalStorage = JSON.parse(localStorage.getItem("pecas")) || [];
    setpecas(pecaLocalStorage);
  }, []);

  const excluir = (peca) => {
    if (window.confirm(`Deseja realmente excluir o Pedido? ${peca.peca}?`)) {
      const novaLista = pecas.filter((item) => item.id !== peca.id);
      localStorage.setItem("pecas", JSON.stringify(novaLista));
      setpecas(novaLista);
      alert("Pedido excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de Pedidos de Peças"}>
      <div className="text-end mb-2">
        <Button href="/pecas/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Peças </th>
            <th>Codigos</th>
            <th>Marca</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {pecas.map((pecas) => (
            <tr key={pecas.id}>
              <td>{pecas.peca}</td>
              <td>{pecas.codigo}</td>
              <td>{pecas.marca}</td>

              <td className="text-center">
                <Button className="me-2" href={`/pecas/form?id=${pecas.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(pecas)}>
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
