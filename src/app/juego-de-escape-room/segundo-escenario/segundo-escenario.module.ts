import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SegundoEscenarioPage } from './segundo-escenario.page';
import { MatButtonModule, MatIconModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: SegundoEscenarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SegundoEscenarioPage]
})
export class SegundoEscenarioPageModule {}
