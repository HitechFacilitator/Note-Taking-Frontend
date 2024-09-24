//  function to handle Backend errors when fetching all notes 

import { BadRequestError, ConflictError, Forbiddenerror, NotFoundError, UnauthorizedError } from "../errors/httpErrors"

async function fetchDataError(input, init) {
    const response = await fetch(input, init) // assigning the fetched data to the response varaible
    if (response.ok) { // determing if an error was encountered
        return response
    } else { // if yes, retrieve the error message froem the error and throw it
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage)
        } else if (response.status === 404) {
            throw new NotFoundError(errorMessage)
        } else if (response.status === 409){
            throw new ConflictError(errorMessage)
        } else if (response.status === 403){
            throw new Forbiddenerror(errorMessage)
        } else if (response.status === 400) {
            throw new BadRequestError(errorMessage)
        } else {
            throw Error("Request failed with status code : "+response.status+" and message : "+errorMessage)
        }
    }
}

export default fetchDataError