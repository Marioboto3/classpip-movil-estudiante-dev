import { ObjetoEnigma } from "./ObjetoEnigma";
import { ObjetoEscape } from "./objetoEscape";

export class Escenario {

    mapa: string;
    descripcion: string;
    profesorId: number;
    id: number;
  

    constructor(mapa?: string, descripcion?: string){
        this.mapa = mapa;
        this.descripcion = descripcion;
    }
}