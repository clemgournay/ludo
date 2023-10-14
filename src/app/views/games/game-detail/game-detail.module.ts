import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { GameDetailRoutingModule } from './game-detail-routing.module';

import { GameDetailComponent } from './game-detail.component';

@NgModule({
  declarations: [
    GameDetailComponent
  ],
  imports: [
    SharedModule,
    GameDetailRoutingModule,
  ],
  providers: []
})
export class GameDetailModule { }
