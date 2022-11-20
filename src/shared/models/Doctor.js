import Person from './Person.js'
import { createInvalidDataError } from '../errors/ErrorInvalidInformation.js'

export default Doctor

class Doctor extends Person {

    #doctor_id
    #specialty
    
    constructor( { doctor_id, name, surname, email, bd_date, id, specialty })
    {
        super( { name, surname, email, bd_date, id } )
        
        if (!specialty) {
            throw createInvalidDataError('Doctor\'s specialty has not been entered')
        }
        this.#specialty = specialty

        if (isNaN(Number(doctor_id))) {
            throw createInvalidDataError('Doctor\'s id must be a number')
        } 
        this.#doctor_id = Number(doctor_id)
    }

    getSpecialty() {
        return this.#specialty
    }

    getDoctorId() {
        return this.#doctor_id
    }

    getDoctor() {
        const doctor = super.getPerson()
        doctor.doctor_id = this.#doctor_id
        doctor.specialty = this.#specialty
        return doctor
    }

}