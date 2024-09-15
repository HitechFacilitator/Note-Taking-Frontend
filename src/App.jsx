import React, { useEffect, useState } from "react";
// import { Note } from "./Models/note.ts"

function App() {
  
  const [notes, setNotes] = useState([]);

  useEffect(() =>{
    async function getAllNotes() {
      try {
        const response = await fetch("/note/getAll", {method: "GET"})
        console.log(response);
        const allNotes = await response.json()
        setNotes(allNotes)
        } catch (error) {
          console.error("Error in loading all Notes : ",error);
          alert(error);
        }
    }
    getAllNotes()
  }, [])

  return (
    <div className="App">
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;
