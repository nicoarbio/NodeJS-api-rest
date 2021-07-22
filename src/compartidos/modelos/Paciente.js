import ConsultaHistoriaClinica from '../../historiasclinicas/modelos/ConsultaHistoriaClinica.js'
import { crearErrorDatosInvalidos } from '../errores/ErrorDatosInvalidos.js'
import Persona from './Persona.js'

class Paciente extends Persona {
    
    #id
    #historiaClinica
    #pathImagen = 'src/compartidos/persistencia/imagesPacientes/paciente_template.png'
    
    constructor( { id, nombre, apellido, email, f_nac, dni, pathImagen = null } )
    {
        
        super( { nombre, apellido, email, f_nac, dni } )
        
        if(pathImagen) this.#pathImagen = pathImagen
        
        this.#historiaClinica = []
        
        if (isNaN(Number(id))) {
            throw crearErrorDatosInvalidos('El ID del paciente debe ser numérico')
        } 
        this.#id = Number(id)
    }

    getId() {
        return this.#id
    }

    getPathImagen() {
        return this.#pathImagen
    }

    agregarConsultaHistoriaClinica( { medico, informacion } ) {
        const fechaHora = new Date() //El momento actual en el que se agrega la consulta
        this.#historiaClinica.push(new ConsultaHistoriaClinica( { medico, fechaHora, informacion } ))
    }

    getHistoriaClinica() {
        return [...this.#historiaClinica]
    }

    getHistoriasClinicas() {
        const historiaClinica = []
        this.#historiaClinica.forEach(hc => {
            historiaClinica.push(hc.getHistoriaClinica())
        })
        return historiaClinica
    }

    getPaciente() {
        const persona = super.getPersona()
        persona.id = this.#id
        persona.historiaClinica = this.getHistoriasClinicas()
        persona.pathImagen = this.#pathImagen
        return persona
    }
}

export default Paciente