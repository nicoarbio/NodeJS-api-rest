import { createInvalidDataError } from "../../shared/errors/ErrorInvalidInformation.js"
import Patient from '../../shared/models/Patient.js'
import Doctor from '../../shared/models/Doctor.js'

export default Appointment

class Appointment {

    #appointment_id
    #patient
    #doctor
    #date

    constructor( { appointment_id, patient, doctor, date } )
    {
        if(!(patient instanceof Patient)) {
            throw createInvalidDataError('Patient entered is not a Patient')
        }
        this.#patient = patient

        if(!(doctor instanceof Doctor)) {
            throw createInvalidDataError('Doctor entered is not a Doctor')
        }
        this.#doctor = doctor
        
        if(!(date instanceof Date)) {
            date = new Date(date)
            if(date.toString() == new Date('').toString()) {
                //"new Date('').toString()"" returns "Invalid Date" bc it is the expected behaviour of the Date constructor when a non-compatible String is recieved.
                //On the other hand, if it recieve a text (via Axios) that meet Date format (and still not being a Date instance), the returned value will be different than the random text, so no error will be catched
                throw createInvalidDataError('Date entered for the appointment is not valid')
            }
        }
        this.#date = date

        if (isNaN(Number(appointment_id))) {
            throw createInvalidDataError('Appointment ID must be numeric')
        } 
        this.#appointment_id = Number(appointment_id)
    }

    getAppointmentId() {
        return this.#appointment_id
    }

    getPatient() {
        return this.#patient
    }

    getDoctor() {
        return this.#doctor
    }
    
    getDate() {
        return this.#date
    }

    printDate() {
        return this.#date.toLocaleString()
    }

    getTurno() {
        return {
            appointment_id: this.#appointment_id,
            patient: this.#patient.getPatient(),
            doctor: this.#doctor.getDoctor(),
            date: this.#date
        }
    }

}