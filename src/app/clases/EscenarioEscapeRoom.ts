import { ObjetoEnigma } from "./ObjetoEnigma";
import { ObjetoEscape } from "./objetoEscape";
import { ObjetoGlobalEscape } from "./ObjetoGlobalEscape";

export class EscenarioEscapeRoom {

    mapa: string;
    descripcion: string;
    profesorId: number;
    id: number;
    objeto1: ObjetoEscape;
    objeto2: ObjetoEscape;
    objetoEnigma: ObjetoEnigma;
    objetoPista: ObjetoEscape;
    objetos: ObjetoGlobalEscape [];

    constructor(mapa?: string, descripcion?: string, objeto1?: ObjetoEscape, objeto2?: ObjetoEscape, objetoEnigma?: ObjetoEnigma, objetoPista?: ObjetoEscape, objetos?: ObjetoGlobalEscape[]){
        this.mapa = mapa;
        this.descripcion = descripcion;
        this.objeto1 = objeto1;
        this.objeto2 = objeto2;
        this.objetoEnigma = objetoEnigma;
        this.objetoPista = objetoPista;
        this.objetos = objetos;
    }
}