"use client";
import '../../banner.css'
import { useState, useEffect } from "react"; // Importando React e useEffect corretamente
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function mecanicoFormPage(props) {
  const [mecanico, setmecanico] = useState({
    mecanico: "",
    carro: "",
    mecanicos: "",

  });

  const [servico, setservico] = useState([]);
  const [caro, setcaro] = useState([]);

  const router = useRouter();


  useEffect(() => {
    const servicoLocalStorage =
      JSON.parse(localStorage.getItem("servico")) || [];
    setservico(servicoLocalStorage);
  }, []);


  useEffect(() => {
    if (mecanico.mecanico) {
      const caroLocalStorage =
        JSON.parse(localStorage.getItem("caro")) || [];
      const caroFiltrados = caroLocalStorage.filter(
        (c) => c.mecanicoId === mecanico.mecanico
      );
      setcaro(caroFiltrados);
    } else {
      setcaro([]);
    }
  }, [mecanico.mecanico]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setmecanico({ ...mecanico, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const mecanicosLocalStorage = JSON.parse(localStorage.getItem("mecanicos")) || [];
    mecanico.id = Date.now();
    mecanicosLocalStorage.push(mecanico);
    localStorage.setItem("mecanicos", JSON.stringify(mecanicosLocalStorage));
    alert("Peça adicionada a lista");
    router.push("/mecanicos");
  };

  return (
    <Pagina titulo={"Cadastro de Peças Desejada:"}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formmecanico">
          <Form.Label>Peça Desejada:</Form.Label>
          <Form.Control
            type="text"
            name="mecanico"
            value={mecanico.mecanico}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formmecanico">
          <Form.Label>caro da Peça:</Form.Label>
          <Form.Control
            type="text"
            name="caro"
            value={mecanico.caro}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formservico">
          <Form.Label>servico da peça:</Form.Label>
          <Form.Control
            type="servico"
            name="servico"
            value={mecanico.servico}
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
