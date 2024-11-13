"use client";
import '../../banner.css'
import { useState, useEffect } from "react";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function pecaFormPage(props) {
  const [peca, setpeca] = useState({
    peca: "",
    carro: "",
    trabalho: "",

  });

  const [feito, setfeito] = useState([]);
  const [servico, setservico] = useState([]);

  const router = useRouter();


  useEffect(() => {
    const feitoLocalStorage =
      JSON.parse(localStorage.getItem("feito")) || [];
    setfeito(feitoLocalStorage);
  }, []);


  useEffect(() => {
    if (peca.peca) {
      const servicoLocalStorage =
        JSON.parse(localStorage.getItem("servico")) || [];
      const servicoFiltrados = servicoLocalStorage.filter(
        (c) => c.pecaId === peca.peca
      );
      setservico(servicoFiltrados);
    } else {
      setservico([]);
    }
  }, [peca.peca]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setpeca({ ...peca, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const trabalhoLocalStorage = JSON.parse(localStorage.getItem("trabalho")) || [];
    peca.id = Date.now();
    trabalhoLocalStorage.push(peca);
    localStorage.setItem("trabalho", JSON.stringify(trabalhoLocalStorage));
    alert("Orden adicionada!");
    router.push("/trabalho");
  };

  return (
    <Pagina titulo={"Serviço desejado:"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formmecanico">
          <Form.Label>mecanico:</Form.Label>
          <Form.Control
            type="text"
            name="mecanico"
            value={peca.mecanico}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formpeca">
          <Form.Label>Serviço:</Form.Label>
          <Form.Control
            type="text"
            name="servico"
            value={peca.servico}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formfeito">
          <Form.Label>Especificaçoes::</Form.Label>
          <Form.Control
            type="feito"
            name="feito"
            value={peca.feito}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <hr></hr>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Pagina>

  );




}
