import { Modal } from "react-bootstrap";


// initialising the popup container to fill the form for a note
const AddNoteBox = ({handleClose}) => {// destructuring the props
    return (
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Add Note </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

export default AddNoteBox;