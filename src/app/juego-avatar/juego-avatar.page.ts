import { Component, OnInit } from '@angular/core';
import { PeticionesAPIService, SesionService, ComServerService } from '../servicios/index';
import { CalculosService } from '../servicios/calculos.service';
import { NavController, AlertController } from '@ionic/angular';
import { Alumno, JuegoDeAvatar, AlumnoJuegoDeAvatar } from '../clases/index';

import * as URL from '../URLs/urls';
import { ModalController } from '@ionic/angular';
import {AvatarEditorPage} from '../avatar-editor/avatar-editor.page';

@Component({
  selector: 'app-juego-avatar',
  templateUrl: './juego-avatar.page.html',
  styleUrls: ['./juego-avatar.page.scss'],
})
export class JuegoAvatarPage implements OnInit {

  alumno: Alumno;
  infoMiAlumno: AlumnoJuegoDeAvatar;
  juegoSeleccionado: JuegoDeAvatar;
  alumnosDelJuego: Alumno[];
  inscripcionesAlumnosJuegodeAvatar: AlumnoJuegoDeAvatar[];
  criterios: Array<{nombre: string, criterio: string}>;
  imagenSilueta: any;
  inscripcionAlumnoJuegoAvatar: AlumnoJuegoDeAvatar;
  tieneAvatar = false;
  interval;
  imagenesAvatares = URL.ImagenesAvatares;
  audioAvatar;
  tieneVoz = false;



  constructor(
    public navCtrl: NavController,
    private sesion: SesionService,
    private peticionesAPI: PeticionesAPIService,
    public modalController: ModalController,
    public alertController: AlertController,
    private comServer: ComServerService
  ) { }

  ngOnInit() {
    this.juegoSeleccionado = this.sesion.DameJuegoAvatar();
    this.alumno = this.sesion.DameAlumno();
    if (this.juegoSeleccionado.modo === 'Individual') {
      this.peticionesAPI.DameInscripcionAlumnoJuegoDeAvatar (this.juegoSeleccionado.id, this.alumno.id)
      .subscribe (inscripcion => {
        this.inscripcionAlumnoJuegoAvatar = inscripcion[0];
        if (this.inscripcionAlumnoJuegoAvatar.silueta !== undefined) {
          this.tieneAvatar = true;
          if ((this.inscripcionAlumnoJuegoAvatar.privilegios[4]) && (this.inscripcionAlumnoJuegoAvatar.voz)) {
            this.tieneVoz = true;
            this.audioAvatar = URL.AudiosAvatares + this.inscripcionAlumnoJuegoAvatar.voz;
          }
        }
        this.PrepararCriterios();
      });
     } else {
       // De momento no hay juego de avatar de equipo
     }
  }


  PrepararCriterios() {
    this.criterios = [
      {nombre: 'Complemento 1', criterio: this.juegoSeleccionado.criteriosPrivilegioComplemento1},
      {nombre: 'Complemento 2', criterio: this.juegoSeleccionado.criteriosPrivilegioComplemento2},
      {nombre: 'Complemento 3', criterio: this.juegoSeleccionado.criteriosPrivilegioComplemento3},
      {nombre: 'Complemento 4', criterio: this.juegoSeleccionado.criteriosPrivilegioComplemento4},
      {nombre: 'Nota de Voz', criterio: this.juegoSeleccionado.criteriosPrivilegioVoz},
      {nombre: 'Espiar Compañeros', criterio: this.juegoSeleccionado.criteriosPrivilegioVerTodos}

    ]
  }
  async AbreEditorAvatar() {
    this.sesion.TomaInscripcionAlumno(this.inscripcionAlumnoJuegoAvatar);
    // abrimos la página del editor de forma modal porque interesa recoger el resultado 
    // para actualizar el avatar en esta página
    const modal = await this.modalController.create({
      component: AvatarEditorPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    // En data me devuelve dos cosas: si ha habido cambio en el avatar y, 
    // en caso afirmativo, la inscripcion que contiene el avatar cambiado
    if (data.hayCambio) {
      this.tieneAvatar = true;
      this.inscripcionAlumnoJuegoAvatar = data.inscripcion;
    }
  }

  VerAvatares() {
    this.navCtrl.navigateForward('/ver-avatares-grupo');
  }

  // Activa la función SeleccionarFicheroVoz
  ActivarInput() {
    console.log('Activar input');
    document.getElementById('inputVoz').click();
}

// Selecciona y guarda el fichero de voz
// Si hay uno anterior lo borra.
async SeleccionarFicheroVoz($event) {

    const file = $event.target.files[0];
    if (this.inscripcionAlumnoJuegoAvatar.voz) {
      // borro el fichero de audio de la voz anterior
      this.peticionesAPI.BorraAudioAvatar (this.inscripcionAlumnoJuegoAvatar.voz).subscribe();
    }

    this.inscripcionAlumnoJuegoAvatar.voz = file.name;
    this.peticionesAPI.ModificaInscripcionAlumnoJuegoDeAvatar (this.inscripcionAlumnoJuegoAvatar)
    .subscribe ();
    const formDataOpcion = new FormData();
    formDataOpcion.append(file.fileName, file);
    this.peticionesAPI.PonAudioAvatar(formDataOpcion)
    .subscribe(async () => {
      this.tieneVoz = true;
        // Notifico al server que se ha modificado un avatar
      this.comServer.Emitir('modificacionAvatar', { inscripcion: this.inscripcionAlumnoJuegoAvatar});
      this.audioAvatar = URL.AudiosAvatares + this.inscripcionAlumnoJuegoAvatar.voz;
      const alert2 = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'voz asignada con exito',
        buttons: ['OK']
      });
      await alert2.present();
    });
}

QuitaVoz() {
  if (this.inscripcionAlumnoJuegoAvatar.voz) {
    // borro el fichero de audio de la voz anterior
    this.peticionesAPI.BorraAudioAvatar (this.inscripcionAlumnoJuegoAvatar.voz).subscribe();
    this.inscripcionAlumnoJuegoAvatar.voz = undefined;
    this.peticionesAPI.ModificaInscripcionAlumnoJuegoDeAvatar (this.inscripcionAlumnoJuegoAvatar)
    .subscribe ();
    this.tieneVoz = false;
  }

}



}
