import { Container, Nav, Navbar } from "react-bootstrap"
import NavBarLoggedInView from "./navBarLoggedInView"
import NavBarLoggedOutView from "./navBarLoggedOutView"


const NavBar = ({loggedInUser, onSignUpClicked, onLogInClicked, onLogOutSuccessful}) =>{

    return(
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand>Cool Note App</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
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