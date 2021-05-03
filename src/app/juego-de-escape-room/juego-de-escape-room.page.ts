import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego-de-escape-room',
  templateUrl: './juego-de-escape-room.page.html',
  styleUrls: ['./juego-de-escape-room.page.scss'],
})
export class JuegoDeEscapeRoomPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nextpage() {
    this.router.navigateByUrl('escoger-avatar');
  }
}
