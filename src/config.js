import dotenv from 'dotenv'
import cronTime from "cron-time-generator"

dotenv.config()

const PORT = process.env.PORT

const URL = `http://127.0.0.1:${PORT}`

const USER = {
    EMAIL: process.env.GMAIL_USER,
    PASSWORD: process.env.GMAIL_PASS
}

const TRANSPORTER_SETTINGS = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: USER.EMAIL,
        pass: USER.PASSWORD
    }
}

const TAM_HOJA = 'A4'
const TIPOGRAFIA = 'Courier'

const RUTA = {
    historiasClinicas: {
        endpoint: {
            datos: '/api/historiasClinicas',
            archivos: '/api/historiasClinicas/descargar',
        },
        archivosServidor: 'src/historiasClinicas/persistencia/files/'
    },
    turnos: {
        endpoint: {
            datos: '/api/turnos'
        }
    }
}

const MAX_DIGIT_DNI = 8

const FRECUENCIA_RECORDATORIO = 1000 * 60 * 60 * 24 * 1 // un día en milisegundos

const CRON_PERIODICIDAD = '5 * * * *' //corre cada 5 minutos
//const CRON_PERIODICIDAD = cronTime.everyDay()

const COLLECTIONS = {
    PACIENTES: 'pacientes',
    MEDICOS: 'medicos',
    TURNOS: 'turnos'
}

const DATABASE_NAME = 'PruebaMongo'

const getPort = () => process.env.PORT || 3000
const getCnxStr = () => process.env.CNX_STR
const getMode = () => process.env.MODE || 'TEST'

export {
    getCnxStr, getMode, getPort,
    DATABASE_NAME,
    MAX_DIGIT_DNI,
    TRANSPORTER_SETTINGS,
    PORT,
    TAM_HOJA,
    TIPOGRAFIA,
    FRECUENCIA_RECORDATORIO,
    CRON_PERIODICIDAD,
    URL,
    RUTA,
    COLLECTIONS
}