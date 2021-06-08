export class ObjetoEscape {

    nombre: string;
    usable: boolean;
    recogido: boolean;
    posicion: string;
    profesorId: number;
  
    constructor(nombre?: string, usable?: boolean, recogido?: boolean, posicion?: string, profesorId?: number) {
  
      this.nombre = nombre;
      this.usable = usable;
      this.recogido = recogido;
      this.posicion = posicion;
      this.profesorId = profesorId;
    }
  }
  