"use client";
import '../../banner.css'
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";

export default function professoresFormPage(props) {
  
  const router = useRouter();

  
  const feedback = JSON.parse(localStorage.getItem("feedback")) || [];

  // Buscar a lista de feedback no localStorage, se não existir, inicializa uma lista vazia
  const professores = JSON.parse(localStorage.getItem("professores")) || [];

  // Recuperando id para edição
  const id = props.searchParams.id;
  console.log(props.searchParams.id);
  // Buscar na lista a faculdade com o ID recebido no parametro
  const professoresEditado = professores.find((item) => item.id == id);
  console.log(professoresEditado);

  // função para salvar os dados do form
  function salvar(dados) {
    // Se professoresEditado existe, mudar os dados e gravar no localStorage
    if (professoresEditado) {
      Object.assign(professoresEditado, dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("professores", JSON.stringify(professores));
    } else {
      // se professoresEditado não existe, é criação de uma nova
      // gerar um ID (Identificador unico)
      dados.id = v4();
      // Adiciona a nova faculdade na lista de faculdades
      professores.push(dados);
      // Substitui a lista antiga pela nova no localStorage
      localStorage.setItem("professores", JSON.stringify(professores));
    }

    alert("feedback enviado com sucesso!");
    router.push("/professores");
  }

  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",



    feedback: "",
  };

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    feedback: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    feedback: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Nós Avalie!"}>
      {/* Formulário */}

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de professoresEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={professoresEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})

            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
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


                </Row>


                <Form.Group as={Col}>
                  <Form.Label>FeedBack:</Form.Label>
                  <Form.Control
                    name="feedback"
                    type="text"
                    value={values.feedback}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.feedback && !errors.feedback}
                    isInvalid={touched.feedback && errors.feedback}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.feedback}
                  </Form.Control.Feedback>
                </Form.Group>


                <hr></hr>
                {/* botões */}
                <Form.Group className="text-end">
                  <Button className="me-2" href="/professores">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Envie seu feedback!
                  </Button>
                </Form.Group>
              </Form>
            );
          }
        }
      </Formik>
    </Pagina>
  );
}
