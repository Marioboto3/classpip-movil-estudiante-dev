

export class ObjetoEscape {

  nombre: string;
  imagen: string;
  usado: boolean;
  recogido: boolean;
  posicion: number;
  escenaId: number;
  juegoDeEscapeRoomId: number;
  id: number;
  objetoGlobalId: number;
  objetoJuegoId: number;
  tipo: string;
  requerido: boolean;
  requeridoEscenaId: number;

 // peso: number;

  constructor(nombre?: string, imagen?: string, usable?: boolean, recogido?: boolean, posicion?: number, escenaId?: number, juegoEscapeRoomId?: number, objetoGlobalId?: number, objetoJuegoId?: number, tipo?: string, requerido?:boolean, requeridoEscenaId?: number) {

    this.nombre = nombre;
    this.imagen = imagen;
    this.usado = usable;
    this.recogido = recogido;
    this.posicion = posicion;
    this.escenaId = escenaId;
    this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    this.objetoGlobalId = objetoGlobalId;
    this.objetoJuegoId = objetoJuegoId;
    this.tipo = tipo;
    this.requerido = requerido;
    this.requeridoEscenaId = requeridoEscenaId;

  }
}
