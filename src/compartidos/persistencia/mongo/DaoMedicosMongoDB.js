import Medico from "../../modelos/Medico.js"

class DaoMedicosMongoDB {

    #nombreCollection
    #dbMedico

    constructor(db, coleccion){
        this.#dbMedico = db.collection(coleccion)
        this.#nombreCollection = coleccion
    }
    
    async #getNextIDMongo() {
        if(await this.#dbMedico.countDocuments( { } ) === 0) {
            return 1
        } else {
            const ids = await this.#dbMedico.find().map(medico => medico.id).toArray()
            const maxID = Math.max.apply(null, ids)
            return maxID + 1
        }
    }
    
    async add(datosMedico) {
        datosMedico.id = await this.#getNextIDMongo()
        const nuevoMedico = new Medico(datosMedico)
        await this.#dbMedico.insertOne(nuevoMedico.getMedico())
        return nuevoMedico
    }
    
    async deleteById(id) {
        const eliminadoDoc = (await this.#dbMedico.findOneAndDelete( { id } )).value
        if(eliminadoDoc) return new Medico(eliminadoDoc)
    }
    
    async getById(id) {
        const medicoDoc = await this.#dbMedico.findOne( { id } )
        if(medicoDoc != null) {
            return new Medico(medicoDoc)
        }
        return null
    }

    async cerrar() {
        console.log(`Cerrando collección: ${this.#nombreCollection} en MongoDB`)
        await db.close()
    }

}

export default DaoMedicosMongoDB