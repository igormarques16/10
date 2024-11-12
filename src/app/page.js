"use client";
import './banner.css';
import Pagina from "@/components/Pagina";
import { Navbar, Nav, Container, Card, Button, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [cliente, setCliente] = useState([]);
  const [carro, setCarro] = useState([]);
  const [trabalho, setTrabalho] = useState([]);
  const [pecas, setPecas] = useState([]);
  const [professores, setprofessores] = useState([]);

  useEffect(() => {
    setCliente(JSON.parse(localStorage.getItem("cliente")) || []);
    setCarro(JSON.parse(localStorage.getItem("carro")) || []);
    setTrabalho(JSON.parse(localStorage.getItem("trabalho")) || []);
    setPecas(JSON.parse(localStorage.getItem("pecas")) || []);
    setprofessores(JSON.parse(localStorage.getItem("professores")) || []);
  }, []);

  const lista = [
    {
      nome: "Cliente",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKYhcHQ2sEmYYq3r4IvG7Eu8YxonuQVqAUEEgfHAPR2SmKg9WPgGzW1x3QPA1gFrT32dM&usqp=CAU",
      quantidade: cliente.length,
      link: "/cliente",
    },
    {
      nome: " Seu Carro",
      imagem:
        "https://images.vexels.com/media/users/3/318541/isolated/preview/68d06118b3a0240615656f4761fbfa32-premium-car-hand-drawing.png",
      quantidade: carro.length,
      link: "/carro",
    },
    {
      nome: "Serviços Prestado",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4elMoycwcUAUgE-ENtVGZz3ONNmn-_4Kfig&s",
      quantidade: trabalho.length,
      link: "/trabalho",
    },
    {
      nome: "Peças",
      imagem:
        "https://cdn-icons-png.flaticon.com/512/484/484613.png",
      quantidade: pecas.length,
      link: "/pecas",
    },
    {
      nome: "Feedbacks",
      imagem:
        "https://cdn-icons-png.freepik.com/256/707/707675.png?semt=ais_hybrid",
      quantidade: professores.length,
      link: "/professores",
    },
  ];

  return (
    <>



      {/* Conteúdo da Página */}
      <Pagina>
        <h1 style={{ fontSize: "4rem", color: "#000000", textAlign: "center", marginTop: "20px" }}>
          Bem-vindo à Oficina do Igor
        </h1>

        {/* Lista de Itens em Formato de Lista */}
        <ListGroup variant="flush">
          {lista.map((item, index) => (
            <ListGroup.Item key={index} className="mb-3">
              <Card className="flex-row align-items-center interactive-card">
                <Card.Img src={item.imagem} style={{ width: "150px", height: "150px", objectFit: "cover", marginRight: "20px" }} />
                <Card.Body>
                  <Card.Title>{item.nome}</Card.Title>
                  <p>Cadastrados: {item.quantidade}</p>
                  <Button href={item.link} variant="primary">
                    Ver Lista
                  </Button>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Pagina>
    </>
  );
}
