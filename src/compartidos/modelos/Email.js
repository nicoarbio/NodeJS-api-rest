import { crearErrorDatosInvalidos } from "../errores/ErrorDatosInvalidos.js"

class Email {

    #address

    static #EMAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    static validarEmail(email) {
        if(!email || !email.match(Email.#EMAILFORMAT)) {
            throw crearErrorDatosInvalidos('Email inválido')
        }
    }

    constructor(email)
    {
        Email.validarEmail(email)
        this.#address = email
    }

    getEmailAddress() {
        return this.#address
    }
}

export default Email