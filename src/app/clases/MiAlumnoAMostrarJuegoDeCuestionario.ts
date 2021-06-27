export class MiAlumnoAMostrarJuegoDeCuestionario {

    Nota: number;
    alumnoId: number;
    juegoDeCuestionarioId: number;
    id: number;
    nombre: string;
    primerApellido: string;
    imagenPerfil: string;
  
    constructor(alumnoId?: number, juegoDeCuestionarioId?: number, Nota?: number,
                Nombre?: string, primerApellido?: string, imagenPerfil?: string) {
  
      this.alumnoId = alumnoId;
      this.juegoDeCuestionarioId = juegoDeCuestionarioId;
      this.Nota = Nota;
      this.nombre = Nombre;
      this.primerApellido = primerApellido;
      this.imagenPerfil = imagenPerfil;
  
    }
  }