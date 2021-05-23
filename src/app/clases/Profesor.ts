export class Profesor {
  nombre: string;
  apellido: string;
  imagenPerfil: string;
  id: number;

  constructor(nombre?: string, apellido?: string, imagenPerfil?: string, id?: number) {

    this.nombre = nombre;
    this.apellido = apellido;
    this.imagenPerfil = imagenPerfil;
    this.id = id;
  }
}
