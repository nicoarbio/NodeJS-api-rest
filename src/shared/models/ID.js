import { createInvalidDataError } from "../errors/ErrorInvalidInformation.js"
import { MAX_DIGIT_DNI } from '../../config.js'

export default ID

class ID {

    #id

    static validateID(id) {
        if (isNaN(id)) {
            throw createInvalidDataError('ID must be numeric')
        }
        if (Number(id) <= 0) {
            throw createInvalidDataError('ID must be a positive integer')
        }
        if (String(id).length < 1 || String(id).length > MAX_DIGIT_DNI) {
            throw createInvalidDataError('ID must have ' + MAX_DIGIT_DNI + ' digits')
        }
    }

    constructor(id)
    {
        ID.validateID(id)
        this.#id = id
    }

    getID() {
        return this.#id
    }
}