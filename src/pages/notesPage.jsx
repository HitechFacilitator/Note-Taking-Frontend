import { Container } from "react-bootstrap";
import NotesPageView from "../Components/notesPageView";
import NotePageLogOutView from "../Components/notePageLogOutView";

const NotesPage = ({loggedInUser}) => {
    return(
        <>
        <Container >
        { loggedInUser ?
            <NotesPageView/>
            :
            <NotePageLogOutView />
        }
        </Container>
        </>
    )
};

export default NotesPage
