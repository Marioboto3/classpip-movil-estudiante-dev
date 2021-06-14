import { ObjetoEscape } from "./objetoEscape";
import { ObjetoPista } from "./ObjetoPista";

export class Mochila {

    objetos: ObjetoEscape [];
    pistasGuardadas: ObjetoPista [];
    idJuegoDeEscapeRoom: number;

  
    constructor(objetos?: ObjetoEscape [], idJuegoDeEscapeRoom?: number, pistasGuardadas?: ObjetoPista []) {
  
      this.objetos = objetos;
      this.idJuegoDeEscapeRoom = idJuegoDeEscapeRoom;
      this.pistasGuardadas = pistasGuardadas;
  
    }
    
  }
  