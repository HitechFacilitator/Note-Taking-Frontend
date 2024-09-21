import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
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
  const [noteToUpdate, setNoteToUpdate] = useState(null)
  const [notesLoading, setnotesLoading] = useState(true)
  const [showNoteLoadingError, setShowNoteLoadingError] = useState(false)

  useEffect(() =>{
    //  Async function to fetch all notes 
    async function getAllNotes() {
      try {
          setnotesLoading(true)
          setShowNoteLoadingError(false)
          const response = await Api.fetchAllData()
          setNotes(response)
        } catch (error) {
          console.error("Error in loading all Notes : ",error);
          setShowNoteLoadingError(true)
        } finally {
          setnotesLoading(false)
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
  const updateExistingNote = (updatedNote) =>{
    setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note ))
    setNoteToUpdate(null)
  }
  async function deleteNote(id){
    try {
      await Api.deleteNote(id)
      setNotes(notes.filter(note => note._id !== id))
      alert("Note deleted successfully")
    } catch (error) {
      console.error("Error encountered when deleting the Note : ",error);
      alert(error)
    }
  }

  // a const to display the notes to facilitate handling in the return fxn
  const displayNotes = <Row xs={1} md={2} xl={3} xxl={4} >{/* 1 row sor small size screen,2 for medium, 3 for large and 4 for extra large screen*/}
                          {notes.map(note =>(
                            <Col key={note._id} className="mb-4">
                              <Note 
                                note={note}
                                handleDelete={deleteNote}
                                onNoteClick={setNoteToUpdate}
                              />
                            </Col>
                          ))}
                        </Row>

  return (
    // displaying the notes in a grid container
    <Container >

      <Button onClick={() => {
          setShowAddNote(true)
        }}
        className={`mb-2 ${Utilstyles.blockCenter} ${Utilstyles.flexCenter}`}
      >
        <FaPlus/>
        Add a Note 
      </Button>
      
      {/* establishing the spinner, error handler and empty handler */}
      {notesLoading && <Spinner animation="border" variant="primary" className={`${Utilstyles.blockCenter}`}/>}
      {showNoteLoadingError && <p className={Utilstyles.center}> An Error was encountered when fetching all notes </p>}
      {!notesLoading && !showNoteLoadingError &&
        <>
          {
            notes.length > 0 ? displayNotes : <p className={Utilstyles.center}>You have no Notes yet</p>
          }
        </>
      }

      { showAddNote &&
        <AddNoteBox 
          handleClose={close} 
          handleSave={saveNewNote}
        />
      }
      { noteToUpdate &&
        <AddNoteBox 
          noteToUpdate={noteToUpdate}
          handleClose={() => setNoteToUpdate(null)}
          handleSave={updateExistingNote}
        />

      }
    </Container>
  );
}

export default App;
