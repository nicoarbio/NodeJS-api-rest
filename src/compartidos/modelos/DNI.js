import { crearErrorDatosInvalidos } from "../errores/ErrorDatosInvalidos.js"
import { MAX_DIGIT_DNI } from '../../config.js'

class DNI {

    #numero

    static validarDNI(dni) {
        if (isNaN(dni)) {
            throw crearErrorDatosInvalidos('El DNI debe ser numerico')
        }
        if (Number(dni) <= 0) {
            throw crearErrorDatosInvalidos('El DNI debe ser un entero positivo')
        }
        if (String(dni).length < 1 || String(dni).length > MAX_DIGIT_DNI) {
            throw crearErrorDatosInvalidos('El DNI debe tener ' + MAX_DIGIT_DNI + ' digitos')
        }
    }

    constructor(dni)
    {
        DNI.validarDNI(dni)
        this.#numero = dni
    }

    getDNI() {
        return this.#numero
    }
}

export default DNI