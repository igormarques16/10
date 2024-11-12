"use client";

import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function clientePage() {
  const [cliente, setcliente] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const clienteLocalStorage =
      JSON.parse(localStorage.getItem("cliente")) || [];
    // guarda a lista no estado cliente
    setcliente(clienteLocalStorage);
    console.log(clienteLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(cliente) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir a cliente ${cliente.id}?`)
    ) {
      // filtra a lista antiga removando a cliente recebida
      const novaLista = cliente.filter((item) => item.id !== clienteRemover.id);
      // grava no localStorage a nova lista
      localStorage.setItem("cliente", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setcliente(novaLista);
      alert("cliente excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de cliente"}>
      <div className="text-end mb-2">
        <Button href="/cliente/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as cliente */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Estado</th>
            <th>Cidade</th>
          </tr>
        </thead>
        <tbody>
          {cliente.map((cliente) => {
            return (
              <tr>
                <td>{cliente.nome}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.pais}</td>
                <td>{cliente.estado}</td>
                <td>{cliente.cidade}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/cliente/form?id=${cliente.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(cliente)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
