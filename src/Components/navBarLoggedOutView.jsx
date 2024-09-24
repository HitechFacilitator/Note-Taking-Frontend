import { Button } from "react-bootstrap";

const NavBarLoggedOutView = ({onLogInBtnClicked, onSignUpBtnClicked}) =>{

    return(
        <>
            <Button onClick={onSignUpBtnClicked}>SignUp</Button>
            <Button onClick={onLogInBtnClicked}>SignIn</Button>
        </>
    )
}

export default NavBarLoggedOutView