import { createInvalidDataError } from '../errors/ErrorInvalidInformation.js'
import ID from './ID.js'
import Email from './Email.js'

export default Person

class Person {

    #name
    #surname
    #email
    #bd_date
    #id
    
    constructor( { name, surname, email, bd_date, id } )
    {
        if (!name) {
            throw createInvalidDataError('No name has been entered')
        }
        this.#name = name
        
        if (!apellido) {
            throw createInvalidDataError('No surname has been entered')
        }
        this.#surname = surname
        
        this.#email = new Email(email)
        
        if(!(bd_date instanceof Date)){
            throw createInvalidDataError('Invalid birthday date')
        }
        this.#f_nac = bd_date
        
        this.#id = new ID(id)
    }

    getPerson() {
        return {
            name: this.#name,
            surname: this.#surname,
            email: this.#email.getEmailAddress(),
            bd_date: this.#bd_date,
            id: this.#id.getID()
        }
    }
    
    getEmail() {
        return this.#email.getEmailAddress()
    }

    getID() {
        return this.#id.getID()
    }
    
    getFullName() {
        return `${this.#surname}, ${this.#name}`
    }

    getFullNameForFile() {
        return `${this.#surname}_${this.#name}`
    }
    
    getAge() {
        //Following example #1: https://www.javatpoint.com/calculate-age-using-javascript
        const year = new Date(Date.now() - this.#bd_date.getTime()).getUTCFullYear()
        const age = Math.abs(year - 1970) //Because of JS implementation, we have to rest 1970
        return age
    }
}