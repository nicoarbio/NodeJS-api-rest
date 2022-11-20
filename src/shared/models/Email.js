import { createInvalidDataError } from "../errors/ErrorInvalidInformation.js"

export default Email

class Email {

    #address

    static #EMAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    static validateEmail(email) {
        if(!email || !email.match(Email.#EMAILFORMAT)) {
            throw createInvalidDataError('Email address not valid')
        }
    }

    constructor(email)
    {
        Email.validateEmail(email)
        this.#address = email
    }

    getEmailAddress() {
        return this.#address
    }
}