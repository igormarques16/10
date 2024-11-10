"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";


export default function Cadastropeca() {
  const [peca, setpeca] = useState({
    peca: "",
    codigo: "",
    marcas: "",

  });

  const [marca, setmarca] = useState([]);
  const [codigo, setcodigo] = useState([]);

  const router = useRouter();


  useEffect(() => {
    const marcaLocalStorage =
      JSON.parse(localStorage.getItem("marca")) || [];
    setmarca(marcaLocalStorage);
  }, []);


  useEffect(() => {
    if (peca.peca) {
      const codigoLocalStorage =
        JSON.parse(localStorage.getItem("codigo")) || [];
      const codigoFiltrados = codigoLocalStorage.filter(
        (c) => c.pecaId === peca.peca
      );
      setcodigo(codigoFiltrados);
    } else {
      setcodigo([]);
    }
  }, [peca.peca]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setpeca({ ...peca, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const pecasLocalStorage = JSON.parse(localStorage.getItem("pecas")) || [];
    peca.id = Date.now();
    pecasLocalStorage.push(peca);
    localStorage.setItem("pecas", JSON.stringify(pecasLocalStorage));
    alert("Peça adicionada a lista");
    router.push("/pecas");
  };

  return (
    <Pagina titulo={"Cadastro de Peças Desejada:"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formpeca">
          <Form.Label>Peça Desejada:</Form.Label>
          <Form.Control
            type="text"
            name="peca"
            value={peca.peca}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formpeca">
          <Form.Label>Codigo da Peça:</Form.Label>
          <Form.Control
            type="text"
            name="codigo"
            value={peca.codigo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formmarca">
          <Form.Label>Marca da peça:</Form.Label>
          <Form.Control
            type="marca"
            name="marca"
            value={peca.marca}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <hr></hr>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </Pagina>
  );
}
