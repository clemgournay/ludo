import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '**', redirectTo: 'play', pathMatch: 'full'},
  //{path: 'games', loadChildren: () => import('src/app/views/games/game-list/game-list.module').then(m => m.GameListModule)},
  {path: 'games/:game-id', loadChildren: () => import('src/app/views/games/game-detail/game-detail.module').then(m => m.GameDetailModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
