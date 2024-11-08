"use client";
import './banner.css'
import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";


export default function HomePage() {
  const cliente = JSON.parse(localStorage.getItem("cliente")) || [];
  const carro = JSON.parse(localStorage.getItem("carro")) || [];
  const trabalho = JSON.parse(localStorage.getItem("trabalho")) || [];
  const pecas = JSON.parse(localStorage.getItem("pecas")) || [];
  const professores = JSON.parse(localStorage.getItem("professores")) || [];

  const lista = [
    {
      nome: "Cliente",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKNc037SaJ_kzuOBkbKKemq-UMTnjRuhhsw&s",
      quantidade: cliente.length,
      link: "/cliente",
    },
    {
      nome: "Carro",
      imagem:
        "https://www.media.stellantis.com/cache/e/8/7/e/f/e87efa1bbd5cc667f31fc5140302ee3fdcda993b.jpeg",
      quantidade: carro.length,
      link: "/carro",
    },
    {
      nome: "Serviços Prestado",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlj3LinipCUVYjt0dUCRQlbbFbnbixc_rJcQ&s",
      quantidade: trabalho.length,
      link: "/trabalho",
    },
    {
      nome: "Pecas",
      imagem:
        "https://i0.wp.com/benedett.com.br/wp-content/uploads/2020/10/autopecas-002.png",
      quantidade: pecas.length,
      link: "/pecas",
    },
    {
      nome: "Outros",
      imagem:
        "https://i.pinimg.com/236x/ce/96/4d/ce964d843b92374b8b96e105ffa82831.jpg",
      quantidade: professores.length,
      link: "/professores",
    },
  ];

  return (
    <Pagina >
  <h1 style={{ fontSize: "4rem", color: "#000000", textAlign: "center" }}>
    Oficina do Igor
  </h1>
  <Row md={4}>
    {lista.map((item) => (
      <Col className="py-2">
        <Card style={{ height: "100%" }}>
          <Card.Img src={item.imagem} style={{ height: "100%" }} />
          <Card.Body>
            <Card.Title>{item.nome}</Card.Title>
            Cadastrados: {item.quantidade}
          </Card.Body>
          <Card.Footer className="text-end">
            <Button href={item.link}>Ver Lista</Button>
          </Card.Footer>
        </Card>
      </Col>
    ))}
  </Row>
</Pagina>

  );
}
