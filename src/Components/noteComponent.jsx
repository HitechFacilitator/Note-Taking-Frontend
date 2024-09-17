import styles from "../styles/Note.module.css"
import {Card} from "react-bootstrap";

// importing the formatdate function from the util file to perform date formating
import { formatDate } from "../Utils/formatDate";


const Note = ({note}) =>{
    // destructuring our note for a more readable/clean work
    const {createdAt, updatedAt, text, title} = note

    let footerText
    // determining what to display in the card footer
    if (createdAt > updatedAt) {
        footerText = "Created: "+formatDate(createdAt)
    }else{
        footerText = "Updated: "+formatDate(updatedAt)
    }

    return(
        <Card className={styles.noteCard}>
            <Card.Body className={styles.cardBody}>
                <Card.Title> {title} </Card.Title>
                <Card.Text className={styles.cardText}> {text} </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">{footerText}</Card.Footer>
        </Card>
    )
}
export default Note;