"use client";

import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function duvidasPage() {
  const [duvidas, setduvidas] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const duvidasLocalStorage =
      JSON.parse(localStorage.getItem("duvidas")) || [];
    // guarda a lista no estado
    setduvidas(duvidasLocalStorage);
    console.log(duvidasLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(feedback) {
    // Confirma com o usuário a exclusão
    if (
      window.confirm(`Deseja realmente excluir o feedback ${feedback.nome}?`)
    ) {
      // filtra a lista antiga removando o feedback recebido
      const novaLista = duvidas.filter((item) => item.id !== dados);
      // grava no localStorage a nova lista
      localStorage.setItem("duvidas", JSON.stringify(novaLista));
      // grava a nova lista no estado para renderizar na tela
      setduvidas(novaLista);
      alert("feedback excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Seu Feedback"}>
      <div className="text-end mb-2">
        <Button href="/professores/form">
          <FaPlusCircle /> Envie seu Feedback
        </Button>
      </div>

      {/* Tabela com os duvidas */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>feedback</th>

          </tr>
        </thead>
        <tbody>
          {duvidas.map((feedback) => {
            return (
              <tr>
                <td>{dados}</td>
                <td>{feedback.nome}</td>
                <td>{feedback.feedback}</td>

                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/duvidas/form?id=${dados}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(dados)}>
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
