import express from 'express'
import CU_FactoryTurnos from '../negocio/CU_FactoryTurnos.js'
import { crearTemporizador } from '../../compartidos/temporizador/temporizadorFactory.js'
import { CRON_PERIODICIDAD } from '../../config.js'

//Genera y programa el temporizador que activa el caso de uso cada {CRON_PERIODICIDAD}
const CU_EnviarRecordatorio = CU_FactoryTurnos.crearCU_EnviarRecordatorio()
crearTemporizador().crearEvento("enviarRecordatorios", CRON_PERIODICIDAD, CU_EnviarRecordatorio.ejecutar)
//La función enviada (.ejecutar) debe ser una función y no puede ser el metodo de un objeto. No puede acceder a la información de la instancia

const routerTurnos = express.Router()

routerTurnos.post('/', async (req, res, next) => {
    try {
        const CU_ReservarTurno = CU_FactoryTurnos.crearCU_ReservarTurno()
        const nuevoTurno = await CU_ReservarTurno.reservarTurno(req.body.idPaciente, req.body.idMedico, req.body.fechaHora)
        res.status(201).json({ 
            nuevoTurno: nuevoTurno.getTurno(),
            msg: 'Se ha creado un nuevo Turno'
        })
    } catch (error) {
        next(error)
    }
})

routerTurnos.delete('/', async (req, res, next) => {
    try {
      const CU_cancelarTurno = CU_FactoryTurnos.crearCU_CancelarTurno()
      const turnoEliminado = await CU_cancelarTurno.cancelarTurno(req.body.idTurno)
      res.status(200).json({ 
        nuevoTurno: turnoEliminado.getTurno(),
        msg: 'El turno solicitado se ha cancelado satisfactoriamente'
    })
    } catch (error) {
      next(error)
    }
    
  })

routerTurnos.use((error, req, res, next) => {
    if (error.type === 'ERROR_DATOS_INVALIDOS') {
        res.status(400)
    } else if (error.type === 'ERROR_EMAIL_SENDER') {
            res.status(400)
    } else {
        res.status(500)
    }
    res.json({ message: error.message })
})

export default routerTurnos