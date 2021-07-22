import Paciente from '../modelos/Paciente.js'

class DaoPacientesCache {
    
    #pacientes = []
    
    #getNextIDCache() {
        if(this.#pacientes.length === 0) {
            return 1
        } else {
            const ids = this.#pacientes.map(p => p.id)
            const maxID = Math.max.apply(null, ids)
            return maxID + 1
        }
    }
    
    async add(datosPaciente) {
        datosPaciente.id = this.#getNextIDCache()
        const nuevoPaciente = new Paciente(datosPaciente)
        this.#pacientes.push(nuevoPaciente)
        return nuevoPaciente
    }
    
    async deleteById(id) {
        const pacienteIdx = this.#pacientes.findIndex(p => p.getId() == id)
        if (pacienteIdx === -1) {
            return null
        }
        return this.#pacientes.splice(pacienteIdx, 1)[0]
    }
    
    async getById(id) {
        return this.#pacientes.find(p => p.getId() == id)
    }

    async addConsultaHistoriaClinica(idPaciente, datosHC) {
        const pacienteIdx = this.#pacientes.findIndex(p => p.getId() == idPaciente)
        if (pacienteIdx === -1) {
            return null
        }
        return this.#pacientes[pacienteIdx].agregarConsultaHistoriaClinica(datosHC)
    }
    
    cerrar(){
        console.log(`Cerrando DAO Medicos en Cache`)
    }
}

export default DaoPacientesCache