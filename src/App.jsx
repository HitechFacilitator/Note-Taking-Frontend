import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as Api from "./Network/notes.api";
//importing Components
import Note from "./Components/noteComponent";
import AddNoteBox from "./Components/addNoteComponent.jsx"
// importing css file(s)
import Utilstyles from "./styles/Utils.module.css"


function App() {
  //  Intialising the notes' state an array
  const [notes, setNotes] = useState([]);
  // Initialising the parameters for the AddNote form/box/modal
  const [showAddNote, setShowAddNote] = useState(false)

  useEffect(() =>{
    //  Async function to fetch all notes 
    async function getAllNotes() {
      try {
          const response = await Api.fetchAllData()
          setNotes(response)
        } catch (error) {
          console.error("Error in loading all Notes : ",error);
          alert(error);
        }
    }
    getAllNotes() //Function call
  }, []/* function execute once, when the page is been rendered */)

  // Arrow function who will serve as indicator to close the AddNote Box
  const close = () => setShowAddNote(false)
  const saveNewNote = (newNote) =>{
    setNotes([...notes, newNote]) //setting the notes state to an array of old notes and the knewly created one
    setShowAddNote(false) // closing the the AddNewNote box
  }
  async function deleteNote(id){
    try {
      await Api.deleteNote(id)
      setNotes(notes.filter(note => note._id != id))
      alert("Note deleted successfully")
    } catch (error) {
      console.error("Error encountered when deleting the Note : ",error);
      alert(error)
    }
  }

  return (
    // displaying the notes in a grid container
    <Container>
      <Button onClick={() => {
          setShowAddNote(true)
        }}
        className={`mb-2 ${Utilstyles.blockCenter} ${Utilstyles.flexCenter}`}
      >
        <FaPlus/>
        Add a Note 
      </Button>
      <Row xs={1} md={2} xl={3} xxl={4} >{/* 1 row sor small size screen,2 for medium, 3 for large and 4 for extra large screen*/}
        {notes.map(note =>(
          <Col key={note._id} className="mb-4">
            <Note 
              note={note}
              handleDelete={deleteNote}
            />
          </Col>
        ))}
      </Row>
      { showAddNote &&
        <AddNoteBox 
          handleClose={close} 
          handleSave={saveNewNote}
        />
      }
    </Container>
  );
}

export default App;
