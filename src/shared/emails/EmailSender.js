import nodemailer from 'nodemailer'
import { createEmailSender } from '../errors/ErrorEmailSender.js'

export default EmailSender

class EmailSender {

    #transporter
   
    constructor(transporterSettings) {
        this.#transporter = nodemailer.createTransport(transporterSettings)
        //CORRECTION: Verification is now syncronic thanks to Promise method
        try {
            this.#transporter.verify()
            console.log("Trasporter successfully created")
        } catch (error) {
            throw createEmailSender("Error while creating Transporter")            
        }
    }

    //CORRECTION PLUS: Now we also use Promise version of .sendMail()
    async sendMail(emailOptions) {
        try {
            await this.#transporter.sendMail(emailOptions)
            console.log(`Email sent to: ${emailOptions.to}`)
        } catch (error) {
            throw createEmailSender('Error while sending the email')
        }
    }
}