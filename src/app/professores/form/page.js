"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

export default function ProfessorFormPage(props) {
  const router = useRouter();

  
  const id = props.searchParams?.id;
  const professores = JSON.parse(localStorage.getItem("professores")) || [];
  const professorEditado = professores.find((item) => item.id === id);

  
  function salvar(dados) {
    if (professorEditado) {
      
      Object.assign(professorEditado, dados);
    } else {
     
      dados.id = uuidv4();
      professores.push(dados);
    }

    
    localStorage.setItem("professores", JSON.stringify(professores));

    alert("Feedback salvo com sucesso!");
    router.push("/professores");
  }

  const initialValues = {
    nome: "",
    avaliacao: "",
    dicas: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    avaliacao: Yup.string().required("Campo obrigatório"),
    dicas: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo="Sua Avaliação">
      <Formik
        initialValues={professorEditado || initialValues}
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
        }) => (
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
                <Form.Label>Gostou do atendimento?</Form.Label>
                <Form.Control
                  name="avaliacao"
                  type="text"
                  value={values.avaliacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.avaliacao && !errors.avaliacao}
                  isInvalid={touched.avaliacao && errors.avaliacao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.avaliacao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Sobre o Serviço executado em seu carro:</Form.Label>
                <Form.Control
                  name="dicas"
                  type="text"
                  value={values.dicas}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dicas && !errors.dicas}
                  isInvalid={touched.dicas && errors.dicas}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dicas}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group as={Row} className="text-end mt-3">
              <Col>
                <Button className="me-2" href="/professores" variant="secondary">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Col>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
