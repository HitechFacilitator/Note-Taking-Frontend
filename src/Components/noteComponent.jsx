import styles from "../styles/Note.module.css"
import Utilstyles from "../styles/Utils.module.css"
import { MdDelete } from "react-icons/md"
import {Card} from "react-bootstrap";

// importing the formatdate function from the util file to perform date formating
import { formatDate } from "../Utils/formatDate";


const Note = ({note, handleDelete, onNoteClick}) =>{
    // destructuring our note for a more readable/clean work
    const {createdAt, updatedAt, text, title} = note

    let footerText
    // determining what to display in the card footer
    if (createdAt >= updatedAt) {
        footerText = "Created: "+formatDate(createdAt)
    }else{
        footerText = "Updated: "+formatDate(updatedAt)
    }

    return(
        <Card 
            className={styles.noteCard}
            onClick={() =>{ onNoteClick(note) }}
        >
            <Card.Body className={styles.cardBody}>
                <Card.Title className={Utilstyles.flexCenter}> 
                    {title}
                    <MdDelete 
                        className="ms-auto"
                        onClick={(e) => {
                            handleDelete(note._id)
                            e.stopPropagation()
                        }}
                    /> 
                </Card.Title>
                <Card.Text className={styles.cardText}> {text} </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{footerText}</Card.Footer>
        </Card>
    )
}
export default Note;