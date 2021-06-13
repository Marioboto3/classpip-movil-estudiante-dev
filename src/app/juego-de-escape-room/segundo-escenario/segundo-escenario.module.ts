import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SegundoEscenarioPage } from './segundo-escenario.page';

const routes: Routes = [
  {
    path: '',
    component: SegundoEscenarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SegundoEscenarioPage]
})
export class SegundoEscenarioPageModule {}
