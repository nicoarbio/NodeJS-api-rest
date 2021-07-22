import Turno from "../modelos/Turno.js"

class DaoTurnosCache {

    #turnos = []

    #getNextIDCache() {
        if(this.#turnos.length === 0) {
            return 1
        } else {
            const ids = this.#turnos.map(t => t.getId())
            const maxID = Math.max.apply(null, ids)
            return maxID + 1
        }
    }

    async addUnique(datosTurno) {
        //que no haya otro turno con el mismo medico y fechaHora
        const existe = this.#turnos.some(t => (
            t.getMedico().getId() === datosTurno.medico.getId()
            &&
            t.getFechaHora() === datosTurno.fechaHora
        ))
        if(!existe) {
            datosTurno.id = this.#getNextIDCache()
            const nuevoTurno = new Turno(datosTurno)
            this.#turnos.push(nuevoTurno)
            return nuevoTurno
        }
    }

    async deleteById(id) {
        const turnoIdx = this.#turnos.findIndex(t => t.getId() == id)
        if (turnoIdx === -1) {
            return null
        }
        return this.#turnos.splice(turnoIdx, 1)[0]
    }

    async getById(id) {
        return this.#turnos.find(t => t.getId() == id)
    }

    async getAll() {
        return [...this.#turnos]
    }
    
    cerrar(){
        console.log(`Cerrando DAO Medicos en Cache`)
    }
}

export default DaoTurnosCache
