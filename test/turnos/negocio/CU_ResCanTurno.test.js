import CU_FactoryTurnos from '../../../src/turnos/negocio/CU_FactoryTurnos.js'
import util from 'util'

async function main(){
    try {
        const CU_ReservarTurno = CU_FactoryTurnos.crearCU_ReservarTurno()
        const CU_CancelarTuro = CU_FactoryTurnos.crearCU_CancelarTurno()

        const maniana = new Date()
        maniana.setDate(maniana.getDate() + 1)
        
        const newTurno = await CU_ReservarTurno.reservarTurno(1, 1, maniana) //id medico, id paciente, fechaHora
        console.log(`Nuevo turno confirmado:`)
        console.log(util.inspect(newTurno.getTurno(), false , 5))
        
        const turnoEliminado = await CU_CancelarTuro.cancelarTurno(newTurno.getId()) //turno
        console.log(`Turno eliminado:`)
        console.log(util.inspect(turnoEliminado.getTurno(), false , 5))
        
    } catch (error) {
        console.log(error.message)
    }
}

main()