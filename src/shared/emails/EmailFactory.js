import EmailSender from './EmailSender.js'
import { TRANSPORTER_SETTINGS } from '../../config.js'

const emailSender = new EmailSender(TRANSPORTER_SETTINGS) //Isn't it a singleton?

export { createEmailSender }

function createEmailSender(){
    return emailSender
}

