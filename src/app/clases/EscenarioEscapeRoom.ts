import { ObjetoEnigma } from "./ObjetoEnigma";
import { ObjetoEscape } from "./objetoEscape";
import { ObjetoGlobalEscape } from "./ObjetoGlobalEscape";

export class EscenarioEscapeRoom {

    mapa: string;
    descripcion: string;
    profesorId: number;
    id: number;
    objetos: ObjetoGlobalEscape [];
    llave: ObjetoEscape;

    constructor(mapa?: string, descripcion?: string, objetos?: ObjetoGlobalEscape[], llave?: ObjetoEscape){
        this.mapa = mapa;
        this.descripcion = descripcion;
        this.objetos = objetos;
        this.llave = llave;
    }
}