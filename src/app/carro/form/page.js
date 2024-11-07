"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function carroFormPage(props) {
  const router = useRouter();

  // Busca a lista de carroEditadas e modeloes para usar nos selects
  const carroEditadas = JSON.parse(localStorage.getItem("carroEditadas")) || [];
  const modeloes = JSON.parse(localStorage.getItem("modeloes")) || [];

  // Recupera o ID para edição, se disponível
  const id = props.searchParams.id;
  const carros = JSON.parse(localStorage.getItem("carros")) || [];
  const carroEditada = carros.find((item) => item.id == id);

  // Função para salvar os dados do form
  function salvar(dados) {
    if (carroEditada) {
      Object.assign(carroEditada, dados);
      localStorage.setItem("carros", JSON.stringify(carros));
    } else {
      dados.id = v4();
      carros.push(dados);
      localStorage.setItem("carros", JSON.stringify(carros));
    }

    alert("carro salva com sucesso!");
    router.push("/carros");
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: "",
    descricao: "",
    carroEditada: "",
    modelo: "",
    status: "",
  };

  // Validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    carroEditada: Yup.string().required("Campo obrigatório"),
    modelo: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"carro"}>
      <Formik
        initialValues={carroEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    name="nome"
                    type="text"
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.nome && !errors.nome}
                    isInvalid={touched.nome && errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Descrição:</Form.Label>
                  <Form.Control
                    name="descricao"
                    type="text"
                    value={values.descricao}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.descricao && !errors.descricao}
                    isInvalid={touched.descricao && errors.descricao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descricao}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>carroEditada:</Form.Label>
                  <Form.Select
                    name="carroEditada"
                    value={values.carroEditada}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.carroEditada && !errors.carroEditada}
                    isInvalid={touched.carroEditada && errors.carroEditada}
                  >
                    <option value="">Selecione</option>
                    {carroEditadas.map((carroEditada) => (
                      <option key={carroEditada.id} value={carroEditada.id}>
                        {carroEditada.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.carroEditada}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Carro:</Form.Label>
                  <Form.Select
                    name="modelo"
                    value={values.modelo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.modelo && !errors.modelo}
                    isInvalid={touched.modelo && errors.modelo}
                  >
                    <option value="">Selecione</option>
                    {modeloes
                      .filter((prof) => prof.carroEditadaId === values.carroEditada)
                      .map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.nome}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.modelo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>cOR:</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.status && !errors.status}
                    isInvalid={touched.status && errors.status}
                  >
                    <option value="">Selecione</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="text-end">
                <Button className="me-2" href="/carros">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
