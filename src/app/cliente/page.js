"use client";

import '../banner.css'
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function clientePage() {
  const [clientes, setclientes] = useState([]);

 
  useEffect(() => {

    const clienteLocalStorage = JSON.parse(localStorage.getItem("cliente")) || [];
   
    setclientes(clienteLocalStorage);
    console.log(clienteLocalStorage);
  }, []);

  
  function excluir(cliente) {
   
    if (
      window.confirm(`Deseja realmente excluir a cliente ${cliente.cliente}?`)
    ) {
     
      const novaLista = clientes.filter((item) => item.id !== cliente.id);
      
      localStorage.setItem("cliente", JSON.stringify(novaLista));
      
      setclientes(novaLista);
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

    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Estado</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((clientes) => {
            return (
              <tr key={clientes.id}>
                <td>{clientes.nome}</td>
                <td>{clientes.endereco}</td>
                <td>{clientes.bairro}</td>
                <td>{clientes.estado}</td>
                <td>{clientes.cidade}</td>
                
                <td className="text-center">
                 
                  <Button
                    className="me-2"
                    href={`/cliente/form?id=${clientes}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(clientes)}>
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
