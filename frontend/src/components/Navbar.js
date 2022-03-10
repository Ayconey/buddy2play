import React from 'react'
import {Navbar,Container,Nav} from 'react-bootstrap';
function Navbaro(props) {

    const handleLogout = () => {
        props.removeToken();
    }

    if(props.token){
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Buddy2Play</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search">search for players</Nav.Link>
                            <Nav.Link href="/searcht">search for teams</Nav.Link>
                            <Nav.Link href="/logout" onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }else{
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Buddy2Play</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
    
}

export default Navbaro
