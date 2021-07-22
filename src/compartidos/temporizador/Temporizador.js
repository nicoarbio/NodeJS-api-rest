import schedule from "node-schedule"

export default class Temporizador{

    constructor() {
        this.listaEventos = []
    }
    
    crearEvento(name, date, job) {
        let evento = schedule.scheduleJob(name, date, job)
        this.listaEventos.push(evento)
    }
    pararEvento(name) {
        schedule.cancelJob(name)
    }
    
    buscarEvento(name)
    {
        name = name.toLowerCase();
        for (let index = 0; index < this.listaEventos.length; index++) {
            const element = this.listaEventos[index];
            if (element.name.toLowerCase() == name) {
                //console.log("lo encontre")
                return element
            }
            
        }
    }
}
