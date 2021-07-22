import Medico from '../../compartidos/modelos/Medico.js'
import { crearErrorDatosInvalidos } from '../../compartidos/errores/ErrorDatosInvalidos.js'


class ConsultaHistoriaClinica { 

    #medicoAsignado
    #fechaHora
    #informacion

    constructor( { medico, fechaHora, informacion } ) {
        if(!(medico instanceof Medico)){
            throw crearErrorDatosInvalidos('El medico ingresado para la consulta no es un Medico')
        }
        this.#medicoAsignado = medico

        if (!(fechaHora instanceof Date)) {
            throw crearErrorDatosInvalidos('La fecha ingrsada para la consulta no es válida')
        }
        this.#fechaHora = fechaHora

        if (!informacion) {
            throw crearErrorDatosInvalidos('No se ha ingresado información para la consulta')
        }
        this.#informacion = informacion
    }

    getMedicoAsignado() {
        return this.#medicoAsignado
    }

    getFechaHora() {
        return this.#fechaHora
    }

    getInformacion() {
        return this.#informacion
    }

    printFechaHora() {
        return this.#fechaHora.toLocaleString()
    }

    getHistoriaClinica() {
        return {
            medicoAsignado: this.#medicoAsignado.getMedico(),
            fechaHora: this.#fechaHora,
            informacion: this.#informacion
        }
    }
}

export default ConsultaHistoriaClinica