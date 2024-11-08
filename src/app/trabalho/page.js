"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function trabalhosPage() {
  const [trabalhos, settrabalhos] = useState([]);

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const trabalhosLocalStorage = JSON.parse(localStorage.getItem("trabalhos")) || [];
    
    settrabalhos(trabalhosLocalStorage);
    console.log(trabalhosLocalStorage);
  }, []);

  // Função para exclusão do item
  function excluir(trabalho) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o trabalho ${trabalho.mecanico}?`)) {
      // filtra a lista antiga removando o trabalho recebido
      const Ordem = trabalhos.filter((item) => item.id !== trabalho.id);
      // grava no localStorage a nova lista
      localStorage.setItem("trabalho", JSON.stringify(Ordem));
      // grava a nova lista no estado para renderizar na tela
      settrabalhos(Ordem);
      alert("Ordem excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Ordens de Serviço"}>
      <div className="text-end mb-2">
        <Button href="/trabalho/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os trabalhos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mecanico</th>
            <th>Serviço</th>
            <th>Valor </th>
            
            
          </tr>
        </thead>
        <tbody>
          {trabalhos.map((trabalho) => {
            return (
              <tr>
                <td>{trabalho.mecanico}</td>
                <td>{trabalho.serviço}</td>
                <td>{trabalho.valor}</td>
                
                
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button className="me-2" href={`/trabalho/form?id=${trabalho.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(trabalho)}>
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
