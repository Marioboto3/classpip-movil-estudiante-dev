export class AlbumDelAlumno {
  nombre: string;
  imagen: string;
  probabilidad: string;
  nivel: string;
  id: number;
  coleccionId: number;
  // tslint:disable-next-line:semicolon
  tengi: boolean

  constructor(nombre?: string, imagen?: string, probabilidad?: string, nivel?: string, tengi?: boolean) {

    this.nombre = nombre;
    this.imagen = imagen;
    this.probabilidad = probabilidad;
    this.nivel = nivel;
    this.tengi = tengi;
  }
}
