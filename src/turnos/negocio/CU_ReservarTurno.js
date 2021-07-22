/*
Historia de usuario: Como un Paciente, necesito encontrar un turno disponible con el médico deseado
Caso de uso del backend: crear un turno relacionando al paciente con el médico
*/

import { crearErrorDatosInvalidos } from '../../compartidos/errores/ErrorDatosInvalidos.js'

class CU_ReservarTurno {

    #daoPacientes
    #daoMedicos
    #daoTurnos
    #emailSender

    constructor(daoPacientes, daoMedicos, daoTurnos, emailSender) {
        this.#daoPacientes = daoPacientes
        this.#daoMedicos = daoMedicos
        this.#daoTurnos = daoTurnos
        this.#emailSender = emailSender
    }

    async reservarTurno(idPaciente, idMedico, fechaHora) {
        const paciente = await this.#daoPacientes.getById(idPaciente)
        if(!paciente){
            throw crearErrorDatosInvalidos('El paciente no existe')
        }

        const medico = await this.#daoMedicos.getById(idMedico)
        if(!medico){
            throw crearErrorDatosInvalidos('El médico no existe')
        }
        
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
        if(fechaHora < new Date()) throw crearErrorDatosInvalidos('No se permite reservar un turno en el pasado')

        const newTurno = await this.#daoTurnos.addUnique( { paciente, medico, fechaHora } )
        if(!newTurno) {
            throw crearErrorDatosInvalidos('Ya existe un turno en el horario especificado para el médico especificado')
        }

        this.#emailSender.sendMail(CU_ReservarTurno.#crearMailOptionPaciente(paciente, medico, newTurno))
        this.#emailSender.sendMail(CU_ReservarTurno.#crearMailOptionMedico(paciente, medico, newTurno))

        return newTurno
    }

    static #crearMailOptionPaciente(paciente, medico, turno) {
         return {
            from : `clinica@lamejor.com`,
            to : paciente.getEmail(),
            subject : `Reserva de Turno - ${turno.getId()}`,
            text : `Hola ${paciente.getFullName()}, usted ha reservado un turno con el doctor ${medico.getFullName()} en el horario: ${turno.printFechaHora()}`
         }
    }

    static #crearMailOptionMedico(paciente, medico, turno) {
        return {
           from : `clinica@lamejor.com`,
           to : medico.getEmail(),
           subject : `Reserva de Turno - ${turno.getId()}`,
           text : `Hola ${medico.getFullName()}, el paciente ${paciente.getFullName()} ha reservado un turno en el horario: ${turno.printFechaHora()}`
        }
    }
}

export default CU_ReservarTurno