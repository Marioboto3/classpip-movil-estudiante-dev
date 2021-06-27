export class MiAlumnoAMostrarJuegoDeGeocaching {

    Puntuacion: number;
    Etapa: number;
    alumnoId: number;
    juegoDeGeocachingId: number;
    id: number;
    nombre: string;
    primerApellido: string;
    imagenPerfil: string;
  
    constructor(alumnoId?: number, juegoDeGeocachingId?: number, Puntuacion?: number, Etapa?: number,
                Nombre?: string, primerApellido?: string, imagenPerfil?: string) {
  
      this.alumnoId = alumnoId;
      this.juegoDeGeocachingId = juegoDeGeocachingId;
      this.Puntuacion = Puntuacion;
      this.Etapa = Etapa;
      this.nombre = Nombre;
      this.primerApellido = primerApellido;
      this.imagenPerfil = imagenPerfil;
  
    }
  }