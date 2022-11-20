import ClinicalHistoryEntry from '../../clinicalhistories/models/ClinicalHistoryEntry.js'
import { createInvalidDataError } from '../errors/ErrorInvalidInformation.js'
import Person from './Person.js'

export default Patient

class Patient extends Person {
    
    #patient_id
    #clinicalHistory
    #pathImg = 'src/shared/persistence/patientsImg/patient_template.png'
    
    constructor( { patient_id, name, surname, email, bd_date, id, pathImg = null } )
    {
        
        super( { name, surname, email, bd_date, id } )
        
        if(pathImg) this.#pathImg = pathImg
        
        this.#clinicalHistory = []

        if (isNaN(Number(patient_id))) {
            throw createInvalidDataError('Patient\'s id must be a number')
        } 
        this.#patient_id = Number(patient_id)
    }

    getPatientId() {
        return this.#patient_id
    }

    getPathImg() {
        return this.#pathImg
    }

    addClinicalHistoryEntry( { doctor, info } ) {
        const date = new Date() //Exact date of the new entry
        this.#clinicalHistory.push(new ClinicalHistoryEntry( { doctor, date, info } ))
    }

    /**
     * 
     * @returns an array of {@link ClinicalHistoryEntry}
     */
    getClinicalHistory() {
        return [...this.#clinicalHistory]
    }

    /**
     * 
     * @returns an array of the content of {@link ClinicalHistoryEntry}
     */
    getClinicalHistories() {
        const clinicalHistory = []
        this.#clinicalHistory.forEach(ch => {
            clinicalHistory.push(ch.getClinicalHistory())
        })
        return clinicalHistory
    }

    getPatient() {
        const patient = super.getPerson()
        patient.patient_id = this.#patient_id
        patient.clinicalHistory = this.getClinicalHistories()
        patient.pathImg = this.#pathImg
        return patient
    }
}