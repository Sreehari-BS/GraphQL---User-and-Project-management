import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand style={{color:"#1695A9"}} className="fw-bold" href="#home">Project Management</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
