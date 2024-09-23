import {registerUser} from "../Network/user.api"
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextInputField from "./form/textInputField";

const SignUpUser = ({handleClose, onSuccessfulSignUp}) =>{

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm()
    
    async function onSubmit(input) {
        try {
            const newUser = await registerUser(input)
            onSuccessfulSignUp(newUser)
        } catch (error) {
            console.error("Error encountered when Registering the User : ",error);
            alert(error)
        }
    } 
    
    return(
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton> 
                <Modal.Title> Sign Up </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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