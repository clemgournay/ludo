import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameAbstractComponent } from 'src/app/components/abstract/game.abstract';

import { Block } from 'src/app/classes/block';
import { Pawn } from 'src/app/classes/pawn';
import { Player } from 'src/app/classes/player';

@Component({
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent extends GameAbstractComponent {

  diceCount: number;
  turnInterval: any;

  playerTurns: Array<string> = ['red', 'blue', 'yellow', 'green'];

  constructor() {
    super('Ludo', 15, 15, 45);
    this.buildGrid();

    this.loadAssets([
      {id: 'wood', type: 'img', src: './assets/images/textures/wood-block.png'},
      {id: 'red', type: 'img', src: './assets/images/textures/red.png'},
      {id: 'blue', type: 'img', src: './assets/images/textures/blue.png'},
      {id: 'yellow', type: 'img', src: './assets/images/textures/yellow.png'},
      {id: 'green', type: 'img', src: './assets/images/textures/green.png'},
    ])

    this.createPlayer('red', 'Red', 'red');
    this.createPlayer('blue', 'Blue', 'blue');
    this.createPlayer('yellow', 'Yellow', 'yellow');
    this.createPlayer('green', 'Green', 'green');

    const redPlayerPawns: Array<Pawn> = [
      new Pawn(this, 'red', 1, 1), new Pawn(this, 'red', 4, 1), new Pawn(this, 'red', 1, 4), new Pawn(this, 'red', 4, 4)
    ];
    const bluePlayerPawns: Array<Pawn> = [
      new Pawn(this, 'blue', 10, 1), new Pawn(this, 'blue', 13, 1), new Pawn(this, 'blue', 10, 4), new Pawn(this, 'blue', 13, 4)
    ];
    const yellowPlayerPawns: Array<Pawn> = [
      new Pawn(this, 'yellow', 10, 10), new Pawn(this, 'yellow', 13, 10), new Pawn(this, 'yellow', 10, 13), new Pawn(this, 'yellow', 13, 13)
    ];
    const greenPlayerPawns: Array<Pawn> = [
      new Pawn(this, 'green', 1, 10), new Pawn(this, 'green', 4, 10), new Pawn(this, 'green', 1, 13), new Pawn(this, 'green', 4, 13)
    ];

    this.getPlayer('red').setPawns(redPlayerPawns);
    this.getPlayer('blue').setPawns(bluePlayerPawns);
    this.getPlayer('yellow').setPawns(yellowPlayerPawns);
    this.getPlayer('green').setPawns(greenPlayerPawns);

    this.getPlayer('red').setStartPos([1, 6]);
    this.getPlayer('blue').setStartPos([8, 1]);
    this.getPlayer('yellow').setStartPos([13, 8]);
    this.getPlayer('green').setStartPos([6, 13]);

    this.start();
  }

  buildGrid(): void {

    const redTrackCoors: Array<Array<number>> = [
      [1, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7]
    ];
    const blueTrackCoors: Array<Array<number>> = [
      [8, 1], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5]
    ];
    const yellowTrackCoors: Array<Array<number>> = [
      [13, 8], [13, 7], [12, 7], [11, 7], [10, 7], [9, 7]
    ];
    const greenTrackCoors: Array<Array<number>> = [
      [6, 13], [7, 13], [7, 12], [7, 11], [7, 10], [7, 9]
    ];

    this.track = [
      [6, 0], [7, 0], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6],
      [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6], [14, 7], [14, 8],
      [13, 8], [12, 8], [11, 8], [10, 8], [9, 8], [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14],
      [7, 14], [6, 14], [6, 13], [6, 12], [6, 11], [6, 10], [6, 9], [6, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
      [0, 7], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [6, 5], [6, 4], [6, 3], [6, 2], [6, 1]
    ];

    for (let i = 0; i < this.grid.width; i++) {
      for (let j = 0; j < this.grid.height; j++) {
        const block = this.getBlock(i, j);

        // Set track
        this.track.forEach((coor: Array<number>) => {
          if (i === coor[0] && j === coor[1]) {
            block.setContent('TRACK');
            block.setColor('wood');
          }
        });

        redTrackCoors.forEach((coor: Array<number>) => {
          if (i === coor[0] && j === coor[1]) block.setColor('red');
        });
        blueTrackCoors.forEach((coor: Array<number>) => {
          if (i === coor[0] && j === coor[1]) block.setColor('blue');
        });
        yellowTrackCoors.forEach((coor: Array<number>) => {
          if (i === coor[0] && j === coor[1]) block.setColor('yellow');
        });
        greenTrackCoors.forEach((coor: Array<number>) => {
          if (i === coor[0] && j === coor[1]) block.setColor('green');
        });

      }
    }

    console.log(this.grid);
  }

  nextPlayer(): void {
    this.currentPlayer ++;
    if (this.currentPlayer > 3) this.currentPlayer = 0;
    this.playTurn();
  }

  playTurn(): void {
    const score = Math.floor(Math.random() * 6) + 1;
    console.log('SCORE', score);

    this.diceCount = score;

    this.turnInterval = setInterval(() => {
      this.moveOnTrack();
    }, 1000);
  }

  moveOnTrack(): void {
    console.log('MOVE  ON TRACK');
    const playerSlug = this.playerTurns[this.currentPlayer];
    const player: Player = this.getPlayer(playerSlug);
    const pawn = player.getPawn(0);
    const initPos = pawn.getInitPos();
    if (pawn.i === initPos[0] && pawn.j === initPos[1]) {
      console.log('ENTER TRACK');
      pawn.enterTrack();
    } else if (this.diceCount >= 0) {
      console.log('MOVE NEXT');
      pawn.moveNext();
      this.diceCount--;
    } else {
      console.log('TURN ENDED');
      clearInterval(this.turnInterval);
      this.nextPlayer();
    }
    this.refresh();
  }

  override checkOtherPlayers(pos: Array<number>): void {
    const pawns = this.getPawnsInCase(pos);
    const playerSlug = this.playerTurns[this.currentPlayer];
    const player: Player = this.getPlayer(playerSlug);
    pawns.forEach((pawn: Pawn) => {
      if (pawn.playerID !== player.getID()) {
        const initPos = pawn.getInitPos();
        pawn.move(initPos[0], initPos[1]);
      }
    });
  }

  start(): void {
    this.playTurn();
  }



}
