import { crearErrorDatosInvalidos } from "../../compartidos/errores/ErrorDatosInvalidos.js"
import Paciente from '../../compartidos/modelos/Paciente.js'
import Medico from '../../compartidos/modelos/Medico.js'

class Turno {

    #id
    #paciente
    #medico
    #fechaHora

    constructor( { id, paciente, medico, fechaHora } )
    {
        if(!(paciente instanceof Paciente)) {
            throw crearErrorDatosInvalidos('El paciente ingresado para el turno no es un Paciente')
        }
        this.#paciente = paciente

        if(!(medico instanceof Medico)) {
            throw crearErrorDatosInvalidos('El medico ingresado para el turno no es un Medico')
        }
        this.#medico = medico
        
        if(!(fechaHora instanceof Date)) {
            /**
             * Resumen: es la validación del formato fecha:
             * Explicación: "new Date('').toString()"" devuelve "Invalid Date" ya que es el comportamiento esperado del constructor de Date cuando no recibe un string que sea compatible. En cambio si recibe un texto (por Axios) que cumple con el formato de Date (pero sigue sin ser una instancia de Date), el valor será diferente al del texto random por lo que no arrojará el error
             */
            try {
                fechaHora = new Date(fechaHora)
                if(fechaHora.toString() == new Date('').toString()) throw new Error()
            } catch (error) {
                throw crearErrorDatosInvalidos('La fecha ingresada para el turno no es válida')
            }
        }
        this.#fechaHora = fechaHora

        if (isNaN(Number(id))) {
            throw crearErrorDatosInvalidos('El ID del turno debe ser numérico')
        } 
        this.#id = Number(id)
    }

    getId() {
        return this.#id
    }

    getPaciente() {
        return this.#paciente
    }

    getMedico() {
        return this.#medico
    }
    
    getFechaHora() {
        return this.#fechaHora
    }

    printFechaHora() {
        return this.#fechaHora.toLocaleString()
    }

    getTurno() {
        return {
            id: this.#id,
            paciente: this.#paciente.getPaciente(),
            medico: this.#medico.getMedico(),
            fechaHora: this.#fechaHora
        }
    }

}

export default Turno