import React, { useEffect, useState } from "react";
// import { Note } from "./Models/note.ts"

function App() {
  //  Intialising an array of notes
  const [notes, setNotes] = useState([]);

  useEffect(() =>{
    //  Async function to fetch all notes 
    async function getAllNotes() {
      try {
        const response = await fetch("/note/getAll", {method: "GET"}) // assigning the fetsched data to the response varaible
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
    <div className="App">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
