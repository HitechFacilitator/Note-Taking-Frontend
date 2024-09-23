import fetchDataError from "../Utils/fetchDataWithError"

export async function createNote(note) {
    const response = await fetchDataError("http://localhost:4000/note/create",
        {
            method: "POST",
            headers :{
                "Content-Type": "application/json"
            },
            body : JSON.stringify(note)
        }
    )
    return await response.json()
}


export async function fetchAllData(setNotes){
    const response = await fetchDataError("http://localhost:4000/note/getAll", {method: "GET"}) 
    return response.json()
}

export async function updateNote(id, note) {
    const response = await fetchDataError("http://localhost:4000/note/update",
        {
            method: "PATCH",
            headers :{
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                Id: id,
                newTitle: note.title,
                newText: note.text 
            })
        }
    )
    return await response.json()
}

export async function deleteNote(id){
    const response = await fetchDataError("http://localhost:4000/note/deleteById",
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({Id : id})
        }
    )
    return response
}
