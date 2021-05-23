export class MiAlumnoAMostrarJuegoDePuntos {

  puntosTotalesAlumno: number;
  alumnoId: number;
  juegoDePuntosId: number;
  id: number;
  nivelId: number;
  nombre: string;
  primerApellido: string;
  imagenPerfil: string;

  constructor(alumnoId?: number, juegoDePuntosId?: number, PuntosTotalesAlumno?: number,
              nivelId?: number, Nombre?: string, PrimerApellido?: string, ImagenPerfil?: string) {

    this.alumnoId = alumnoId;
    this.juegoDePuntosId = juegoDePuntosId;
    this.nivelId = nivelId;
    this.puntosTotalesAlumno = PuntosTotalesAlumno;
    this.nombre = Nombre;
    this.primerApellido = PrimerApellido;
    this.imagenPerfil = ImagenPerfil;

  }
}

