import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
//importing Components
import LoginUser from "./Components/logInComponent.jsx";
import NavBar from "./Components/navBarComponent.jsx";
import NotesPageView from "./Components/notesPageView.jsx";
import SignUpUser from "./Components/signUpComponent.jsx";
import { getLogginUser } from "./Network/user.api.js";
import NotePageLogOutView from "./Components/notePageLogOutView.jsx";


function App() {

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogIn, setShowLogIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLogginUser()
        setLoggedInUser(user)
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser()
  },[])

  return (
    <div>

    <NavBar 
      loggedInUser={loggedInUser?loggedInUser:null}
      onSignUpClicked={() => setShowSignUp(true)}
      onLogInClicked={() => setShowLogIn(true)}
      onLogOutSuccessful={() => setLoggedInUser(null)}
    />
    
    <Container >
      { loggedInUser ?
        <NotesPageView/>
        :
        <NotePageLogOutView />
      }
    </Container>

    { showSignUp &&
      <SignUpUser
        handleClose={() => {setShowSignUp(false)}}
        onSuccessfulSignUp={(user) => {
          setLoggedInUser(user)
          setShowSignUp(false)
        }}
      />
    }
    { showLogIn &&
      <LoginUser
        handleClose={() => {setShowLogIn(false)}}
        onLoginSuccessful={(user) => {
          setLoggedInUser(user)
          setShowLogIn(false)
        }}
      />
    }
    
    </div>

  );
}

export default App;
