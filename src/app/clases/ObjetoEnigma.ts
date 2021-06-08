export class ObjetoEnigma {

    nombre: string;
    pregunta: string;
    respuesta: string;
    resuelta: boolean;
    profesorId: number;
  
    constructor(nombre?: string, pregunta?: string,  respuesta?: string, resuelta?: boolean, profesorId?: number) {
  
      this.nombre = nombre;
      this.pregunta = pregunta;
      this.respuesta = respuesta;
      this.resuelta = resuelta;
      this.profesorId = profesorId;
    }
  }