import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { GameListRoutingModule } from './game-list-routing.module';

import { GameListComponent } from './game-list.component';

@NgModule({
  declarations: [
    GameListComponent
  ],
  imports: [
    SharedModule,
    GameListRoutingModule,
  ],
  providers: []
})
export class GameListModule { }
