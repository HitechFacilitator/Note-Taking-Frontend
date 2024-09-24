import { Button, Navbar } from "react-bootstrap";
import { logoutUser } from "../Network/user.api"

const NavBarLoggedInView = ({user, onLogOutSuccessful}) =>{
    async function onLogOut() {
        try {
            await logoutUser()
            onLogOutSuccessful()
        } catch (error) {
            console.error("Error encountered during the LogOut Process : ",error);
            alert(error)
        }
    }

    return(
        <>
            <Navbar.Text>SignIn as : {user.name}</Navbar.Text>
            <Button onClick={onLogOut}>LogOut</Button>
        </>
    )
}

export default NavBarLoggedInView