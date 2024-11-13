"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      <ul class="nav justify-content-center"  id="myTab" role="tablist">
      <Navbar bg="blue" variant="white" expand="lg" >
        <Container>
          <Navbar.Brand href="/">Oficina do Igor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >

              <Nav.Link href="/cliente">Clientes</Nav.Link>
              <Nav.Link href="/carro">Carros</Nav.Link>
              <Nav.Link href="/trabalho">Serviços Prestados</Nav.Link>
              <Nav.Link href="/pecas">Peças</Nav.Link>
              <Nav.Link href="/professores">Outros</Nav.Link>
              
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </ul>
      <div class="p-3 mb-2 bg-transparent text-center text-blacl py-2"><h1>{titulo}</h1></div>


      {/* Conteudo da Página */}
      <Container className="mt-3">{children}</Container>
    </>
  );
}
