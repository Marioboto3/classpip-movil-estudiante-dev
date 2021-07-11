import { ObjetoEscape } from "./objetoEscape";
import { ObjetoGlobalEscape } from "./ObjetoGlobalEscape";
import { ObjetoPista } from "./ObjetoPista";

export class Mochila {

    objetos: ObjetoGlobalEscape [] = [];
    pistasGuardadas: ObjetoPista [] = [];
    idJuegoDeEscapeRoom: number;

  
    constructor(objetos?: ObjetoGlobalEscape [], idJuegoDeEscapeRoom?: number, pistasGuardadas?: ObjetoPista []) {
  
      this.objetos = objetos;
      this.idJuegoDeEscapeRoom = idJuegoDeEscapeRoom;
      this.pistasGuardadas = pistasGuardadas;
  
    }
    
  }
  