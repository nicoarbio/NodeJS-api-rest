import { FRECUENCIA_RECORDATORIO } from "../../config.js"

function CU_EnviarRecordatorioTurnosProximos(daoTurnos, enviadorDeMail) {
    return {
        ejecutar: async () => {
            const turnos = await daoTurnos.getAll()

            const turnosProximos = filtrarTurnosPorTiempoRestante(turnos)
            
            turnosProximos.forEach(turno => {
                enviadorDeMail.sendMail(crearMailOptionPaciente(turno))
            })
        }
    }    
}

function crearMailOptionPaciente(turno) {
    return {
        from : `clinica@lamejor.com`,
        to : turno.getPaciente().getEmail(),
        subject : `Recordatorio de Turno - ${turno.getId()}`,
        text : `Hola ${turno.getPaciente().getFullName()}, le recordamos que tiene un turno en fecha ${turno.printFechaHora()} con el médico ${turno.getMedico().getFullName()}`
     }
}

function filtrarTurnosPorTiempoRestante(turnos, tiempoRestante = FRECUENCIA_RECORDATORIO) {
    //tiempoRestante equivale a 24hs en ms
    const fechaActualNumero = new Date().getTime() //Fecha actual en ms
    const listaFiltrada = []
    for (const turno of turnos)
    {
        const fechaTurno = turno.getFechaHora().getTime() //Fecha turno en ms
        const diferenciaEntreTurnoYFechaActual = fechaTurno - fechaActualNumero
        if (diferenciaEntreTurnoYFechaActual <= tiempoRestante && diferenciaEntreTurnoYFechaActual > 0) {
            listaFiltrada.push(turno)        
        }
    }
    return listaFiltrada
}

export default CU_EnviarRecordatorioTurnosProximos

/* import { FRECUENCIA_RECORDATORIO } from "../../config.js"

class CU_EnviarRecordatorioTurnosProximos {

    #daoTurnos
    #enviadorDeMail

    constructor(daoTurnos, enviadorDeMail) {
        this.#daoTurnos = daoTurnos
        this.#enviadorDeMail = enviadorDeMail
    }

    async ejecutar() {
        const turnos = await this.#daoTurnos.getAll()

        const turnosProximos = this.#filtrarTurnosPorTiempoRestante(turnos)
        
        turnosProximos.forEach(turno => {
            this.#enviadorDeMail.sendMail(CU_EnviarRecordatorioTurnosProximos.#crearMailOptionPaciente(turno))
        })
    }
    
    static #crearMailOptionPaciente(turno) {
        return {
            from : `clinica@lamejor.com`,
            to : turno.getPaciente().getEmail(),
            subject : `Recordatorio de Turno - ${turno.getId()}`,
            text : `Hola ${turno.getPaciente().getFullName()}, le recordamos que tiene un turno en fecha ${turno.printFechaHora()} con el médico ${turno.getMedico().getFullName()}`
         }
    }

    #filtrarTurnosPorTiempoRestante(turnos, tiempoRestante = FRECUENCIA_RECORDATORIO) {
        //tiempoRestante equivale a 24hs en ms
        const fechaActualNumero = new Date().getTime() //Fecha actual en ms
        const listaFiltrada = []
        for (const turno of turnos)
        {
            const fechaTurno = turno.getFechaHora().getTime() //Fecha turno en ms
            const diferenciaEntreTurnoYFechaActual = fechaTurno - fechaActualNumero
            if (diferenciaEntreTurnoYFechaActual <= tiempoRestante) {
                listaFiltrada.push(turno)        
            }
        }
        return listaFiltrada
    }

}

export default CU_EnviarRecordatorioTurnosProximos
 */