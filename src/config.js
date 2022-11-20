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

const SHEET_SIZE = 'A4'
const TYPOGRAPHY = 'Courier'

const ROUTE = {
    ClinicalHistories: {
        endpoint: {
            data: '/api/historiasClinicas',
            files: '/api/historiasClinicas/descargar',
        },
        serverFiles: 'src/historiasClinicas/persistencia/files/'
    },
    appointments: {
        endpoint: {
            data: '/api/turnos'
        }
    }
}

const MAX_DIGIT_DNI = 8

const REMINDER_FREQUENCY = 1000 * 60 * 60 * 24 * 1 // a day in miliseconds

const CRON_PERIODICITY = '5 * * * *' //runs every 5 mins
//const CRON_PERIODICITY = cronTime.everyDay()

const COLLECTIONS = {
    PATIENTS: 'patients',
    DOCTORS: 'doctors',
    APPOINTMENTS: 'appointments'
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
    SHEET_SIZE,
    TYPOGRAPHY,
    REMINDER_FREQUENCY,
    CRON_PERIODICITY,
    URL,
    ROUTE,
    COLLECTIONS
}