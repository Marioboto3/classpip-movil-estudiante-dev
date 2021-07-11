import { AuthService } from './../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { PeticionesAPIService} from '../servicios/index';
import { SesionService} from '../servicios/sesion.service';
import { CalculosService } from '../servicios/calculos.service';
import { Juego, Equipo, Alumno, MiAlumnoAMostrarJuegoDePuntos, Grupo, MiEquipoAMostrarJuegoDePuntos } from '../clases/index';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController, AlertController } from '@ionic/angular';
// import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import * as URL from '../URLs/urls';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {

  base64Image: any;
  alumno: Alumno;
  miImagenAlumno: string[] = [];
  misAlumnosAMostrar: MiAlumnoAMostrarJuegoDePuntos[] = [];
  imagenPerfil: string;
  contrasenaRep: string;
  cambio = false;
  cambioPass = false;
  originalUsername: string;

  constructor(
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    private calculos: CalculosService,
    public alertController: AlertController,
    //public camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private auth: AuthService
  ) { }

  ngOnInit() {
    console.log ('estoy en mi perfil');
    if(this.sesion.DameAlumno() == undefined){
      this.auth.getUserIdByToken(this.auth.getAccessToken()).subscribe((data: any) => {
        this.auth.getAlumno(data.userId).subscribe((alumno: Alumno) => {
          this.alumno = alumno;
          this.originalUsername = alumno.username;
          console.log(this.originalUsername);
        })
      })
    } else {
      this.alumno = this.sesion.DameAlumno();
      this.originalUsername = this.alumno.username;
      console.log(this.originalUsername);
    } 
  }

  // accessGallery() {
  //   this.camera.getPicture({
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //     destinationType: this.camera.DestinationType.DATA_URL
  //   }).then((imageData) => {
  //     this.base64Image = 'data:image/jpeg;base64,' + imageData;
  //     }, (err) => {
  //     console.log(err);
  //   });
  // }

  // pickImage(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     // tslint:disable-next-line:object-literal-shorthand
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     // let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  // async selectImage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Select Image source',
  //     buttons: [{
  //       text: 'Load from Library',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  //       }
  //     },
  //     {
  //       text: 'Use Camera',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.CAMERA);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  CambiarImagen() {
    document.getElementById('inputImagen').click();
  }

  emailCorrecto(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  SeleccionarimagenPerfil($event) {
    const imagen = $event.target.files[0];
    const formData = new FormData();
    formData.append(imagen.name, imagen);
    this.peticionesAPI.PonimagenPerfil(formData)
    .subscribe (() => {
      this.alumno.imagenPerfil = URL.ImagenesPerfil + imagen.name;
      this.peticionesAPI.ModificaAlumno(this.alumno).subscribe(() => {
        this.sesion.TomaAlumno(this.alumno);
      });
     });
  }

  async CambiarDatos () {

    this.auth.checkEmail(this.alumno.email).subscribe(async (data: any) => {
      console.log('email data: ', data);
      let filter = data.filter(user => user.id == this.alumno.id);
      if((filter != null && data.length == 1) || data.length == 0){
        this.auth.checkUsername(this.alumno.username).subscribe(async (data: any) => {
          console.log('user data: ', data);
          let filter = data.filter(user => user.id == this.alumno.id);
          if((filter != null && data.length == 1) || data.length == 0){
            const confirm = await this.alertController.create({
              header: 'Por motivos de seguridad, introduce tu contraseña actual',
              inputs: [
                {
                  name: 'password',
                  placeholder: 'Password',
                  type: 'password'
                }
              ],
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  handler: () => {
                  }
                },
                {
                  text: 'Actualizar',
                  handler: async (secConfirm) => {
                    if (this.cambioPass && (this.alumno.password !== this.contrasenaRep)) {
                      const alert = await this.alertController.create({
                        header: 'No coincide la contraseña con la contraseña repetida',
                        buttons: ['OK']
                      });
                      await alert.present();
                    } else if(this.alumno.password == secConfirm.password){
                      const alert = await this.alertController.create({
                        header: 'La nueva contraseña no puede coincidir con la actual',
                        buttons: ['OK']
                      });
                      await alert.present();
                    } else if (!this.emailCorrecto (this.alumno.email)) {
                      const alert = await this.alertController.create({
                        header: 'El email es incorrecto',
                        buttons: ['OK']
                      });
                      await alert.present();
                    } else {
                      let user = {"username": this.originalUsername, "password": secConfirm.password}
                      console.log('credentials: ', user);
                      this.auth.login(user).subscribe((data) => {
                        if(localStorage.getItem('ACCESS_TOKEN') != null){
                          this.auth.setLocalAccessToken(data.id);
                        } else {
                          this.auth.setAccessToken(data.id);
                        }
                        this.peticionesAPI.ModificaAlumno (this.alumno)
                        .subscribe (async (data) => {
                          console.log('respuesta mod: ', data);
                          this.sesion.TomaAlumno(data)
                          this.originalUsername = this.alumno.username;
                          this.alumno.password = null;
                          this.cambioPass = false;
                          this.contrasenaRep = null;
                          this.cambio = false;
                          const alert = await this.alertController.create({
                            header: 'Datos modificados con éxito',
                            buttons: ['OK']
                          });
                          await alert.present();
                        });
                      }, async (error) => {
                        const alert = await this.alertController.create({
                          header: 'Contraseña actual incorrecta',
                          buttons: ['OK']
                        });
                        await alert.present();
                      })
                    }
                  }
                }
              ]
            });
            await confirm.present();
          } else {
            const alert = await this.alertController.create({
              header: 'El nombre de usuario ya existe',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      } else {
        const alert = await this.alertController.create({
          header: 'El email ya existe',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
