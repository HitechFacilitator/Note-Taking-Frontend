import React, { useEffect, useState } from "react";
import Note from "./Components/noteComponent";
// import styles from "./styles/notesPage.module.css";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  //  Intialising an array of notes
  const [notes, setNotes] = useState([]);

  useEffect(() =>{
    //  Async function to fetch all notes 
    async function getAllNotes() {
      try {
        const response = await fetch("http://localhost:4000/note/getAll", {method: "GET"}) // assigning the fetsched data to the response varaible
        console.log(response);
        const allNotes = await response.json() // parse the json body of the above response to "allNotes" const
        setNotes(allNotes) // set allNote(the response i.e the array of notes i.e multiple notes found in the DB)
        } catch (error) {
          console.error("Error in loading all Notes : ",error);
          alert(error);
        }
    }
    getAllNotes() //Function call
  }, []/* function execute once, when the page is been rendered */)

  return (
    // displaying the notes in a grid container
    <Container>
      <Row xs={1} md={2} xl={3} xxl={4} >{/* 1 row sor small size screen,2 for medium, 3 for large and 4 for extra large screen*/}
        {notes.map(note =>(
          <Col key={note._id} className="mb-4">
            <Note note={note}/>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
