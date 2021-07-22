import EmailSender from './EmailSender.js'
import { TRANSPORTER_SETTINGS } from '../../config.js'

const emailSender = new EmailSender(TRANSPORTER_SETTINGS) //al hacer esto no es un singleton?

function crearEmailSender(){
    return emailSender
}

export { crearEmailSender }