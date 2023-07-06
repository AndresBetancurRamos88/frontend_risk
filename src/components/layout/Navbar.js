import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Link} from 'react-router-dom';
import Logo from '../images/Logo.png';
import Image from 'react-bootstrap/Image';
import LoginButton from '../login/Login';

function Navba() {
    const [login, setLogin] = useState(false);

    const handleLoginChange = (isLoggedIn) => {
        setLogin(isLoggedIn);
    };
    const expand = false 
    return (
        <>
            <Navbar className="fixed-top" key={expand} expand={expand} bg="warning" data-bs-theme="warning">
                <Container fluid>
                    <Link to="/">
						<Image style={{ clipPath: "circle(90%)", float: "left", marginLeft: "20px" }} src={Logo} width="35%"/>
					</Link>
                    <Navbar.Brand className="col-7 justify-content-center" href="/">
                        <h1 className="text-center">Gestión riesgos ciberseguridad</h1>
                    </Navbar.Brand>
                    <LoginButton  onLoginChange={handleLoginChange}/>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        bg="warning"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                {login && (
                                    JSON.parse(localStorage.getItem('token')).userinfo.name
                                )}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Link to="/" class="nav-link active" aria-current="page">Home</Link>
                                {login && (
                                    <>
                                    <Link to="/dashboard" className="nav-link active" aria-current="page">Tablero</Link>
                                    <Link to="/riskform" className="nav-link active" aria-current="page">Ingresar Riesgo</Link>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default Navba;