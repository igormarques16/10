"use client";
import '../../banner.css'
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function carroFormPage(props) {
  const router = useRouter();

  
  const carroEditadas = JSON.parse(localStorage.getItem("carroEditadas")) || [];


  
  const id = props.searchParams.id;
  const carro = JSON.parse(localStorage.getItem("carro")) || [];
  const carroEditada = carro.find((item) => item.id == id);

  
  function salvar(dados) {
    if (carroEditada) {
      Object.assign(carroEditada, dados);
      localStorage.setItem("carro", JSON.stringify(carro));
    } else {
      dados.id = v4();
      carro.push(dados);
      localStorage.setItem("carro", JSON.stringify(carro));
    }

    alert("carro salva com sucesso!");
    router.push("/carro");
  }


  const initialValues = {
    nome: "",
    descricao: "",
    carroEditada: "",
    cor: "",
  };

  
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    carroEditada: Yup.string().required("Campo obrigatório"),
    cor: Yup.string().required("Campo obrigatório"), 
  });

  return (
    <Pagina titulo={"Seu Carro!"}>
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
                  <Form.Label>Marca:</Form.Label>
                  <Form.Select
                    name="carroEditada"
                    value={values.carroEditada}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.carroEditada && !errors.carroEditada}
                    isInvalid={touched.carroEditada && errors.carroEditada}
                  >
                    <option value="ativo">Selecione</option>
                    <option value="For">Ford</option>
                    <option value="Honda">Honda</option>
                    <option value="Hyunday">Hyundai</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Fiat">Fiat</option>
                    <option value="BMW">BMW</option>
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


              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Cor do Veículo:</Form.Label>
                  <Form.Control
                    name="cor"
                    type="text"
                    value={values.cor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cor && !errors.cor}
                    isInvalid={touched.cor && errors.cor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cor}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <hr></hr>
              <Form.Group as={Row} className="text-end mt-3">
                <Col>
                  <Button className="me-2" href="/carro" variant="secondary">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
