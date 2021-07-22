import Medico from "../modelos/Medico.js"

class DaoMedicosCache {
    
    #medicos = []

    #getNextIDCache() {
        if(this.#medicos.length === 0) {
            return 1
        } else {
            const ids = this.#medicos.map(m => m.getId())
            const maxID = Math.max.apply(null, ids)
            return maxID + 1
        }
    }

    async add(datosMedico) {
        datosMedico.id = this.#getNextIDCache()
        const nuevoMedico = new Medico(datosMedico)
        this.#medicos.push(nuevoMedico)
        return nuevoMedico
    }
    
    async deleteById(id) {
        const medicoIdx = this.#medicos.findIndex(m => m.getId() == id)
        if (medicoIdx === -1) {
            return null
        }
        return this.#medicos.splice(medicoIdx, 1)[0]
    }
    
    async getById(id) {
        return this.#medicos.find(m => m.getId() == id)
    }
    
    cerrar(){
        console.log(`Cerrando DAO Medicos en Cache`)
    }
}

export default DaoMedicosCache