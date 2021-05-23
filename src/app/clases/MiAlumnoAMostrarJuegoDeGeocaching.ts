export class MiAlumnoAMostrarJuegoDeGeocaching {

    puntuacion: number;
    etapa: number;
    alumnoId: number;
    juegoDeGeocachingId: number;
    id: number;
    nombre: string;
    primerApellido: string;
    imagenPerfil: string;
  
    constructor(alumnoId?: number, juegoDeGeocachingId?: number, Puntuacion?: number, Etapa?: number,
                Nombre?: string, PrimerApellido?: string, ImagenPerfil?: string) {
  
      this.alumnoId = alumnoId;
      this.juegoDeGeocachingId = juegoDeGeocachingId;
      this.puntuacion = Puntuacion;
      this.etapa = Etapa;
      this.nombre = Nombre;
      this.primerApellido = PrimerApellido;
      this.imagenPerfil = ImagenPerfil;
  
    }
  }