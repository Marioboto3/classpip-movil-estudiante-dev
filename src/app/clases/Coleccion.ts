export class Coleccion {
  nombre: string;
  imagenColeccion: string;
  dosCaras: boolean;
  id: number;
  profesorId: number;

  constructor(nombre?: string, imagenColeccion?: string, dosCaras?: boolean) {

    this.nombre = nombre;
    this.imagenColeccion = imagenColeccion;
    this.dosCaras = dosCaras;
  }
}
