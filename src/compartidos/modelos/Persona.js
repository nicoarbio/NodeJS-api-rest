import { crearErrorDatosInvalidos } from '../errores/ErrorDatosInvalidos.js'
import DNI from './DNI.js'
import Email from './Email.js'

class Persona {

    #nombre
    #apellido
    #email
    #f_nac
    #dni
    
    constructor( { nombre, apellido, email, f_nac, dni } )
    {
        if (!nombre) {
            throw crearErrorDatosInvalidos('No se ha ingresado un nombre')
        }
        this.#nombre = nombre
        
        if (!apellido) {
            throw crearErrorDatosInvalidos('No se ha ingresado un apellido')
        }
        this.#apellido = apellido
        
        this.#email = new Email(email)
        
        if(!(f_nac instanceof Date)){
            throw crearErrorDatosInvalidos('La fecha de nacimiento ingresada no es válida')
        }
        this.#f_nac = f_nac
        
        this.#dni = new DNI(dni)
    }

    getPersona() {
        return {
            nombre: this.#nombre,
            apellido: this.#apellido,
            email: this.#email.getEmailAddress(),
            f_nac: this.#f_nac,
            dni: this.#dni.getDNI()
        }
    }
    
    getEmail() {
        return this.#email.getEmailAddress()
    }

    getDNI() {
        return this.#dni.getDNI()
    }
    
    getFullName() {
        return `${this.#apellido}, ${this.#nombre}`
    }

    getFullNameForFile() {
        return `${this.#apellido}_${this.#nombre}`
    }
    
    getAge() {
        //Apoyado por el ejemplo 1: https://www.javatpoint.com/calculate-age-using-javascript
        const anno = new Date(Date.now() - this.#f_nac.getTime()).getUTCFullYear()
        const edad = Math.abs(anno - 1970) //Por como cuenta los años JS se debe restar 1970
        return edad
    }
}

export default Persona