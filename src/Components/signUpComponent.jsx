import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { registerUser } from "../Network/user.api";
import { ConflictError, Forbiddenerror, UnauthorizedError } from "../errors/httpErrors";
import TextInputField from "./form/textInputField";

const SignUpUser = ({handleClose, onSuccessfulSignUp}) =>{

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm()
    const [errorText, setErrorText] = useState(null)
    
    async function onSubmit(input) {
        try {
            const newUser = await registerUser(input)
            onSuccessfulSignUp(newUser)
        } catch (error) {
            if (error instanceof UnauthorizedError || error instanceof Forbiddenerror || error instanceof ConflictError ) {
                setErrorText(error.message)
            } else {
                alert(error.message)
            }
            console.error("Error encountered when Registering the User : ",error);
        }
    } 
    
    return(
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton> 
                <Modal.Title> Sign Up </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { errorText &&
                    <Alert variant="danger">{errorText}</Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <TextInputField
                        name="name"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{required: "Your username is required to create your account"}}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{required: "Your Email is required for your account creation"}}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Your password is needed to create your account"}}
                        error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting} style={{width:"100%", marginTop:"15px"}}> SignUp </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpUser