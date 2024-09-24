
class HttpError extends Error{
    constructor(msg) {
        super(msg);
        this.name = this.constructor.name
        
    }
}

export class UnauthorizedError extends HttpError {}

export class NotFoundError extends HttpError {}

export class BadRequestError extends HttpError {}

// status code here is 403 
export class Forbiddenerror extends HttpError {}

// status code here is 409 
export class ConflictError extends HttpError {} 