import nodemailer from 'nodemailer'
import { crearErrorEmailSender } from '../errores/ErrorEmailSender.js'

class EmailSender {

    #transporter
   
    constructor(transporterSettings) {
        this.#transporter = nodemailer.createTransport(transporterSettings)
        //CORRECCIÓN: Ahora la verificación es sincrónica gracias al metodo promesa
        try {
            this.#transporter.verify()
            console.log("Trasporter creado con exito")
        } catch (error) {
            throw crearErrorEmailSender("Error al crear el Transporter")            
        }
    }

    //PLUS DE CORRECCIÓN: Ahora también utilizamos la version Promise del .sendMail()
    async sendMail(mailOptions) {
        try {
            await this.#transporter.sendMail(mailOptions)
            console.log(`Email enviado a: ${mailOptions.to}`)
        } catch (error) {
            throw crearErrorEmailSender('Error al enviar el correo')
        }
    }
}

export default EmailSender