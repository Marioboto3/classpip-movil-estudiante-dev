import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';

import { PrimerEscenarioPage } from './primer-escenario.page';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PrimerEscenarioPage
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
  declarations: [PrimerEscenarioPage]
})
export class PrimerEscenarioPageModule {}
