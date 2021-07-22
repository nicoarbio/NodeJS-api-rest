import { getMode, COLLECTIONS, DATABASE_NAME } from '../../config.js'

let daoPacientes
let daoMedicos
let daoTurnos

switch (getMode()) {
    case 'PROD':
        const { crearMongoClient } = await import('./mongo/mongoClient.js')
        const { default: DaoPacientesMongoDB } = await import('./mongo/DaoPacientesMongoDB.js')
        const { default: DaoMedicosMongoDB } = await import('./mongo/DaoMedicosMongoDB.js')
        const { default: DaoTurnosMongoDB } = await import('../../turnos/persistencia/mongo/DaoTurnosMongoDB.js')
        const { getCnxStr } = await import('../../config.js')
        
        const cnxStr = getCnxStr()
        const mongoClient = crearMongoClient(cnxStr, DATABASE_NAME)
        const db = await mongoClient.connect()
        daoPacientes = new DaoPacientesMongoDB(db, COLLECTIONS.PACIENTES)
        daoMedicos = new DaoMedicosMongoDB(db, COLLECTIONS.MEDICOS)
        daoTurnos = new DaoTurnosMongoDB(db, COLLECTIONS.TURNOS)
        console.log("Atención: Se han configurado los daos de MongoDB")
        break;
    default:
        //const DaoPacientesCache = await import('./DaoPacientesCache.js')
        const { default: DaoPacientesCache } = await import('./DaoPacientesCache.js')
        const { default: DaoMedicosCache } = await import('./DaoMedicosCache.js')
        const { default: DaoTurnosCache } = await import('../../turnos/persistencia/DaoTurnosCache.js')
        //daoPacientes = new DaoPacientesCache.default()
        daoPacientes = new DaoPacientesCache()
        daoMedicos = new DaoMedicosCache()
        daoTurnos = new DaoTurnosCache()
        console.log("Atención: Se han configurado los daos en Caché")
        break;
}

function getDaoTurnos() {
    return daoTurnos
}

function getDaoPacientes() {
    return daoPacientes
}

function getDaoMedicos() {
    return daoMedicos
}

//NOTA IMPORTANTE
//No tenemos CU (y por lo tanto endopoints) para agregar pacientes, medicos o agregar una nueva consulta a la historia clinica de un determinado paciente por lo que directamente accedemos al DAO para que los endpoints desarrollados puedan funcionar. Esperamos contar con el tiempo suficiente para desarrollar los demas casos de uso y endpoints.
/* const nuevoPaciente = {
    nombre: 'Juan Carlos Paci',
    apellido: 'Rey',
    email: 'nicolasarbio@outlook.com',
    f_nac: new Date(),
    dni: 45065477
}
const pacienteAgregado = await daoPacientes.add(nuevoPaciente)
const nuevoMedico = {
    nombre: 'Juan Carlos Medi',
    apellido: 'Rey',
    email: 'niqo99@gmail.com',
    f_nac: new Date(),
    dni: 12345678,
    especialidad: 'Otorrinolaringología'
}
const medicoAgregado = await daoMedicos.add(nuevoMedico) */

/* let datosHistoriaClinica
datosHistoriaClinica = {
    medico: await daoMedicos.getById(1),
    informacion: 'El paciente sufre de una otitis aguda'
}
await daoPacientes.addConsultaHistoriaClinica(2, datosHistoriaClinica)
datosHistoriaClinica = {
    medico: await daoMedicos.getById(1),
    informacion: 'El paciente se recuperó de la otitis y goza de un buen estado de salud'
} */

export default {
    getDaoPacientes,
    getDaoMedicos,
    getDaoTurnos,
}