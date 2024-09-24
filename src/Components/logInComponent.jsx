import { useState } from "react";
import { loginUser } from "../Network/user.api"
import TextInputField from "./form/textInputField"
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError, Forbiddenerror, UnauthorizedError } from "../errors/httpErrors";

const LoginUser = ({handleClose, onLoginSuccessful}) =>{

    const [errorText, setErrorText] = useState(null)

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm()

    async function onSubmit(input) {
        try {
            const user = await loginUser(input)
            onLoginSuccessful(user)
        } catch (error) {
            if (error instanceof UnauthorizedError || error instanceof Forbiddenerror ) {
                setErrorText(error.message)
            } else {
                alert(error.message)
            }
            console.error("Error encountered when Logging In the User : ",error);
        }
    }

    return(
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton> 
                <Modal.Title> Sign In </Modal.Title>
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
                        registerOptions={{required: "Your username is required to LogIn"}}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "You Forgot to enter your password"}}
                        error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting} style={{width:"100%", marginTop:"15px"}}> Sign In </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LoginUser