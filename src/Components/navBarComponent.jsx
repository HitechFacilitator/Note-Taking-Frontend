import { Container, Nav, Navbar } from "react-bootstrap"
import NavBarLoggedInView from "./navBarLoggedInView"
import NavBarLoggedOutView from "./navBarLoggedOutView"
import {Link} from "react-router-dom"


const NavBar = ({loggedInUser, onSignUpClicked, onLogInClicked, onLogOutSuccessful}) =>{

    return(
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">{/** Behave as the "Link" tag */}
                    Cool Note App
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link>
                        <Link to="/privacy" style={{color:"white"}}> Privacy </Link>
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    { loggedInUser ?
                        <NavBarLoggedInView 
                            user={loggedInUser}
                            onLogOutSuccessful={onLogOutSuccessful}
                        />
                        :
                        <NavBarLoggedOutView 
                            onSignUpBtnClicked={onSignUpClicked}
                            onLogInBtnClicked={onLogInClicked}
                        />
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar