import Doctor from '../../shared/models/Doctor.js'
import { createInvalidDataError } from '../../shared/errors/ErrorInvalidInformation.js'

export default ClinicalHistoryEntry

class ClinicalHistoryEntry { 

    #assignedDoctor
    #date
    #information

    constructor( { doctor, date, information } ) {
        if(!(doctor instanceof Doctor)){
            throw createInvalidDataError('Doctor entered is not a Doctor')
        }
        this.#assignedDoctor = doctor

        if (!(date instanceof Date)) {
            throw createInvalidDataError('Date is not valid for the clinical history entry')
        }
        this.#date = date

        if (!information) {
            throw createInvalidDataError('No information provided for this clinical history entry')
        }
        this.#information = information
    }

    getAssignedDoctor() {
        return this.#assignedDoctor
    }

    getDate() {
        return this.#date
    }

    getInformation() {
        return this.#information
    }

    printDate() {
        return this.#date.toLocaleString()
    }

    getClinicalHistory() {
        return {
            assignedDoctor: this.#assignedDoctor.getDoctor(),
            date: this.#date,
            information: this.#information
        }
    }
}