import CU_ReservarTurno from './CU_ReservarTurno.js'
import CU_CancelarTurno from './CU_CancelarTurno.js'
import CU_EnviarRecordatorio from './CU_EnviarRecordatorioTurnosProximos.js'

import DaoFactory from '../../compartidos/persistencia/daoFactory.js'

import { crearEmailSender } from '../../compartidos/emails/EmailFactory.js'

const daoPacientes = DaoFactory.getDaoPacientes()
const daoMedicos = DaoFactory.getDaoMedicos()
const daoTurnos = DaoFactory.getDaoTurnos()

function crearCU_ReservarTurno() {
    return new CU_ReservarTurno(daoPacientes, daoMedicos, daoTurnos, crearEmailSender())
}

function crearCU_CancelarTurno() {
    return new CU_CancelarTurno(daoTurnos, crearEmailSender())
}

function crearCU_EnviarRecordatorio() {
    return CU_EnviarRecordatorio(daoTurnos, crearEmailSender())
}

export default {
    crearCU_ReservarTurno,
    crearCU_CancelarTurno,
    crearCU_EnviarRecordatorio
}