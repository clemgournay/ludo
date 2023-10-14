import { Component, Directive, ViewChild, ElementRef } from "@angular/core";
import { AssetManager } from "src/app/classes/asset-manager";
import { Block } from "src/app/classes/block";

import { Grid } from "src/app/classes/grid";
import { Pawn } from "src/app/classes/pawn";
import { Player } from "src/app/classes/player";

@Directive()

export class GameAbstractComponent {

    title: string;

    width: number = 800;
    height: number = 800;

    grid: Grid;

    players: Array<Player> = [];

    track: Array<Array<number>> = [];

    assetManager: AssetManager;

    assets: any;

    ctx: CanvasRenderingContext2D;

    @ViewChild('gameView') gameView: ElementRef;

    constructor(title: string = 'Undefined', width: number = 10, height: number = 10, blockSize: number = 50) {
        this.title = title;
        this.grid = new Grid(width, height, blockSize);
        this.width = width * blockSize;
        this.height = height * blockSize;
        this.assetManager = new AssetManager();
    }

    ngAfterViewInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.ctx = this.gameView.nativeElement.getContext('2d');
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawGrid();
        //this.drawGuideline();
        this.drawPawns();
    }

    async loadAssets(assetsToLoad: Array<any>): Promise<void> {
        this.assets = await this.assetManager.load(assetsToLoad);
    }

    drawGuideline(): void {
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 1;
        for (let i = 0; i < this.grid.width; i++) {
            for (let j = 0; j < this.grid.height; j++) {
                this.ctx.rect(i * this.grid.blockSize, j * this.grid.blockSize, this.grid.blockSize, this.grid.blockSize);
                this.ctx.stroke();
            }
        }
    }

    drawGrid(): void {
        for (let i = 0; i < this.grid.width; i++) {
            for (let j = 0; j < this.grid.height; j++) {
                const block = this.getBlock(i, j);
                if (block.getContent() === 'TRACK') {
                    const img = this.assets['wood'];
                    this.ctx.drawImage(img, i * this.grid.blockSize, j * this.grid.blockSize, this.grid.blockSize, this.grid.blockSize);
                } else {
                    const color = block.getColor();
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(i * this.grid.blockSize, j * this.grid.blockSize, this.grid.blockSize, this.grid.blockSize);
                }
                
            }
        }
    }

    drawPawns(): void {
        const halfBlock = this.grid.blockSize / 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.players.forEach((player: Player) => {
            this.ctx.fillStyle = player.getColor();
            player.getPawns().forEach((pawn: Pawn) => {
                this.ctx.beginPath();
                this.ctx.arc(pawn.x + halfBlock, pawn.y + halfBlock, halfBlock, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
                this.ctx.closePath();
            });
        });
    }

    getBlock(i: number, j: number): Block {
        return this.grid.getBlock(i, j);
    }

    createPlayer(id: string, name: string, color: string): void {
        this.players.push(new Player(id, name, color));
    }

    getPlayer(id: string): Player {
        let i = 0, found = false;
        while (!found && i < this.players.length) {
            if (this.players[i].getID() === id) found = true;
            else i++;
        }
        return this.players[i];
    }

    getTrackBlockIndex(i: number, j: number): number {
        let x = 0, found = false;
        while (!found && x < this.track.length) {
            if (this.track[x][0] === i && this.track[x][1] === j) found = true;
            else x++;
        }
        return x;
    }

    getAssets(): any {
        return this.assets;
    }
    
}