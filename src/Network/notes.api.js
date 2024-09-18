//  function to handle Backend errors when fetching all notes 
async function fetchDataError(input, init) {
    const response = await fetch(input, init) // assigning the fetched data to the response varaible
    if (response.ok) { // determing if an error was encountered
        return response
    } else { // if yes, retrieve the error message froem the error and throw it
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        throw Error(errorMessage)
    }
}

export async function fetchAllData(setNotes){
    const response = await fetchDataError("http://localhost:4000/note/getAll", {method: "GET"}) 
    return response.json()
}

export async function createNote(note) {
    const response = await fetchAllData("http://localhost:4000/note/create",
        {
            method: "POST",
            header :{
                "Content-Type": "application/json"
            },
            body : JSON.stringify(note)
        }
    )
    return response
}