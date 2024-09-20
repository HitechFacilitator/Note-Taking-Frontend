import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
// importing the file containing our APIs(gate btw our frontend and backend)
import { createNote } from "../Network/notes.api";


// initialising the popup container to fill the form for a note
const AddNoteBox = ({handleClose, handleSave}) => {// destructuring the props
    // initialising react-hook-form for use
    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm()

    // function to be executed when "save" btn is clicked
    async function onSubmit(input) {
        try {
            const noteResponse = await createNote(input)
            handleSave(noteResponse)
        } catch (error) {
            console.error("Error encountered when creating the Note : ",error);
            alert(error)
        }
    }
    
    return (
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Add Note </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Title" 
                            isInvalid={!!errors.title}
                            {...register("title", {required: "Title is required"}) }
                        />
                        <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={7} 
                            placeholder="Add content/text (Optional)" 
                            {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                    type="submit"
                    form="addNoteForm"
                    disabled={isSubmitting}
                    // onClick={handleClose}
                >Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNoteBox;