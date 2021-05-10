export class AlumnoJuegoDeEscapeRoom {

    alumnoId: number;
    personaje: string;
    juegoEscapeRoomId: number;
    id: number;

    constructor(alumnoId?: number, personaje?:string, juegoEscapeRoomId?: number) {
      this.alumnoId = alumnoId;
      this.personaje = personaje;
      this.juegoEscapeRoomId = juegoEscapeRoomId;
    }
  }
  