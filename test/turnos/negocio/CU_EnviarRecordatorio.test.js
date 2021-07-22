import CU_FactoryTurnos from '../../../src/turnos/negocio/CU_FactoryTurnos.js'

async function main(){
    try {
        const en7horas = new Date(new Date().getTime() + 1000*60*60*7) // turno en fecha actual + 7 horas
        const en5min = new Date(new Date().getTime() + 1000*60*5) // turno en fecha actual + 5 minutos
        const en4dias = new Date(new Date().getTime() + 1000*60*60*24*4) // turno en fecha actual + 4 dias

        const CU_ReservarTurno = CU_FactoryTurnos.crearCU_ReservarTurno()
        await CU_ReservarTurno.reservarTurno(1, 1, en7horas) //id medico, id paciente, fechaHora
        await CU_ReservarTurno.reservarTurno(1, 1, en5min) //id medico, id paciente, fechaHora
        await CU_ReservarTurno.reservarTurno(1, 1, en4dias) //id medico, id paciente, fechaHora

        //EL 3er TURNO ES CREADO PERO NUNCA SE ENVIA EL MAIL PORQUE LA FECHA DEL TURNO (4 DIAS) ES SUPERIOR A LA ESTABLECIDA (24hs)
        const CU_EnviarRecordatorio = CU_FactoryTurnos.crearCU_EnviarRecordatorio()
        CU_EnviarRecordatorio.ejecutar()

    } catch (error) {
        console.log(error.message)
    }
}

main()