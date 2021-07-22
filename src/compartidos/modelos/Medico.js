import Persona from '../../compartidos/modelos/Persona.js'
import { crearErrorDatosInvalidos } from '../errores/ErrorDatosInvalidos.js'

class Medico extends Persona {

    #id
    #especialidad
    
    constructor( { id, nombre, apellido, email, f_nac, dni, especialidad })
    {
        super( { nombre, apellido, email, f_nac, dni } )
        
        if (!especialidad) {
            throw crearErrorDatosInvalidos('No se ha ingresado una especialidad')
        }
        this.#especialidad = especialidad
        
        if (isNaN(Number(id))) {
            throw crearErrorDatosInvalidos('El ID del médico debe ser numérico')
        } 
        this.#id = Number(id)
    }

    getEspecialidad() {
        return this.#especialidad
    }

    getId() {
        return this.#id
    }

    getMedico() {
        const persona = super.getPersona()
        persona.id = this.#id
        persona.especialidad = this.#especialidad
        return persona
    }

}

export default Medico