import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextInputField from "./form/textInputField"
// importing the file containing our APIs(gate btw our frontend and backend)
import { createNote, updateNote } from "../Network/notes.api";


// initialising the popup container to fill the form for a note
const AddNoteBox = ({handleClose, handleSave, noteToUpdate}) => {// destructuring the props
    // initialising react-hook-form for use
    const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm({
        defaultValues: {
            title: noteToUpdate?.title || "",
            text: noteToUpdate?.text || ""
        }
    })

    // function to be executed when "save" btn is clicked
    async function onSubmit(input) {
        try {
            let noteResponse;
            if (noteToUpdate) {
                noteResponse = await updateNote(noteToUpdate._id, input)
            }else{
                noteResponse = await createNote(input)
            }
            console.log("bos ",noteResponse);
            handleSave(noteResponse)
        } catch (error) {
            console.error("Error encountered when creating the Note : ",error);
            alert(error)
        }
    }
    
    return (
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{noteToUpdate ? "Edit Note" : "Add Note" }</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        type="text"
                        name="title"
                        label="Title"
                        placeholder="Title"
                        error={errors.title}
                        register={register}
                        registerOptions={{required: "Title is required"}}
                    />

                    <TextInputField
                        as="textarea"
                        rows={7}
                        name="text"
                        label="Describtion"
                        error={errors.text}
                        placeholder="Add content/text (Optional)"
                        register={register}
                        registerOptions={{}}
                    />
                    
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