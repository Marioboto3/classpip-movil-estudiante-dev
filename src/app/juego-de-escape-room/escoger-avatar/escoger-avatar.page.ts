import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/clases';
import { AlumnoJuegoDeEscapeRoom } from 'src/app/clases/AlumnoJuegoDeEscapeRoom';
import { CalculosService, SesionService } from 'src/app/servicios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-escoger-avatar',
  templateUrl: './escoger-avatar.page.html',
  styleUrls: ['./escoger-avatar.page.scss'],
})
export class EscogerAvatarPage implements OnInit {

  verDescripcion1: string;
  verDescripcion2: string;
  verDescripcion3: string;
  verDescripcion4: string;

  alumno: Alumno;
  alumnoEscape: AlumnoJuegoDeEscapeRoom;
  juego: any;

  name1: string = "Elvis Tek";
  name2: string = "Conpa Tatas";
  name3: string = "Aitor Tugas";
  name4: string = "Inés Table";

  name:string;
  /*slides = [
    { 
      title: "Elvis Tek",
      subtitle: "Estudiante de segundo grado",
      description: "Estudiante de segundo en el colegio Makoko, no será el mejor estudiante del colegio, pero es un gran compañero y sobre todo, el carisma que tiene hace que sea muy popular. Si te identificas con Elvis tek y quieres pasar un buen rato, adelante!",
      image:"../../../assets/elder.png"
    },
    { 
      title: "Laman Teca",
      subtitle: "Estudiante de tercer grado",
      description: "Estudiante escurridiza",
      image:"../../../assets/manteca.jpg"
    }
  ]*/
  constructor(private router: Router,     
              private sesion: SesionService,
              private calculos: CalculosService
              ) { 
  }

  ngOnInit() {

    this.alumno = this.sesion.DameAlumno();
    this.juego = this.sesion.DameJuegoEscapeRoom();
    console.log("Juego: ", this.juego);
    this.alumnoEscape = new AlumnoJuegoDeEscapeRoom (this.alumno.id, "empty", this.juego.id);
  
  }
  cogerpersonaje(name: string){
    this.name = name;
    this.alumnoEscape.personaje = name;
    console.log("ALUMNO:  ", this.alumnoEscape);
    Swal.fire({
      title: '¿Seguro que quieres este personaje?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
          this.calculos.añadirPersonaje(this.alumnoEscape.alumnoId, this.alumnoEscape.juegoDeEscapeRoomId, this.alumnoEscape.personaje);
          this.sesion.TomaPrueba(false);
          this.router.navigateByUrl('primer-escenario');
      }
    });
  }
  descripcion1(){
    this.verDescripcion1 = "true";
  }
  descripcion2(){
    this.verDescripcion2 = "true";
  }
  descripcion3(){
    this.verDescripcion3 = "true";
  }
  descripcion4(){
    this.verDescripcion4 = "true";
  }
  volver(){
    this.verDescripcion1 = null;
    this.verDescripcion2 = null;
    this.verDescripcion3 = null;
    this.verDescripcion4 = null;
  }

}
