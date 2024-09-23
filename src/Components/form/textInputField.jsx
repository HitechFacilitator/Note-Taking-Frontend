// Reusable text input field
import { Form } from "react-bootstrap";

const TextInputField = ({name, label, error, register, registerOptions, ...props}) =>{
    return (
        <Form.Group controlId={name+".input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default TextInputField

