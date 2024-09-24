import React, { useEffect, useState } from "react";
//importing Components
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginUser from "./Components/logInComponent.jsx";
import NavBar from "./Components/navBarComponent.jsx";
import SignUpUser from "./Components/signUpComponent.jsx";
import { getLogginUser } from "./Network/user.api.js";
import NotFoundPage from "./pages/notFoundPage.jsx";
import NotesPage from "./pages/notesPage.jsx";
import PrivacyPage from "./pages/privacyPage.jsx";


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
    <BrowserRouter>
    <div>
    <NavBar 
      loggedInUser={loggedInUser?loggedInUser:null}
      onSignUpClicked={() => setShowSignUp(true)}
      onLogInClicked={() => setShowLogIn(true)}
      onLogOutSuccessful={() => setLoggedInUser(null)}
    />
    
    <Container>
      <Routes>
        <Route 
          path="/"
          element= {<NotesPage loggedInUser={loggedInUser} />}
        />
        <Route 
          path="/privacy"
          element= {<PrivacyPage />}
        />
        <Route 
          path="/*"
          element= {<NotFoundPage />}
        />
      </Routes>
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
    </BrowserRouter>
  );
}

export default App;
