//historia de usuario
//Como un Paciente, necesito cancelar un turno, con la finalidad de cancelar la cita con el medico que había obtenido anteriormente

/*  paciente => id
    medico => id
    turnos => id
*/
import { crearErrorDatosInvalidos } from '../../compartidos/errores/ErrorDatosInvalidos.js'

class CU_cancelarTurno {

    #daoTurnos
    #emailSender

    constructor(daoTurnos, emailSender) {
        this.#daoTurnos = daoTurnos
        this.#emailSender = emailSender
    }

    async cancelarTurno(idTurno) {
        const turnoEliminado = await this.#daoTurnos.deleteById(idTurno)
        if(!turnoEliminado) {
            throw crearErrorDatosInvalidos('El turno con el id especificado, no existe')
        }
        
        const paciente = turnoEliminado.getPaciente()
        const medico = turnoEliminado.getMedico()

        this.#emailSender.sendMail(CU_cancelarTurno.#crearMailOptionPaciente(paciente, medico, turnoEliminado))
        this.#emailSender.sendMail(CU_cancelarTurno.#crearMailOptionMedico(paciente, medico, turnoEliminado))

        return turnoEliminado
    }
    
    static #crearMailOptionPaciente(paciente, medico, turno) {
        return {
            from : `clinica@lamejor.com`,
            to : paciente.getEmail(),
            subject : `Cancelacion de Turno - ${turno.getId()}`,
            text : `Hola ${paciente.getFullName()}, usted ha cancelado el turno con el doctor ${medico.getFullName()} en el horario: ${turno.printFechaHora()}`
        }
    }
    static #crearMailOptionMedico(paciente, medico, turno) {
        return {
            from : `clinica@lamejor.com`,
            to : medico.getEmail(),
            subject : `Cancelacion de Turno - ${turno.getId()}`,
            text : `Hola ${medico.getFullName()}, el paciente ${paciente.getFullName()} ha cancelado un turno en el horario: ${turno.printFechaHora()}`
        }
    }

}

export default CU_cancelarTurno