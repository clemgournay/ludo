import { GameAbstractComponent } from "../components/abstract/game.abstract";

export class Pawn {
    
    game: GameAbstractComponent;
    playerID: string;
    i: number;
    j: number;
    x: number;
    y: number;
    private blockIndex: number;
    private initPos: Array<number> = [];
    private onTrack: boolean = false;

    constructor(game: GameAbstractComponent, playerID: string, i: number, j: number) {
        this.game = game;
        this.playerID = playerID;
        this.i = i;
        this.j = j;
        this.x = i * this.game.grid.blockSize;
        this.y = j * this.game.grid.blockSize;
        this.initPos = [this.i, this.j];
        this.blockIndex = 0;
    }

    move(i: number, j: number) {
        this.i = i;
        this.j = j;
        this.x = i * this.game.grid.blockSize;
        this.y = j * this.game.grid.blockSize;
    }

    moveNext(): void {
        const track = this.game.track;
        this.blockIndex++;
        console.log(this.blockIndex)
        const newBlock = track[this.blockIndex % track.length];
        this.move(newBlock[0], newBlock[1]);
    }

    getBlockIndex(): number {
        return this.blockIndex;
    }

    getInitPos(): Array<number> {
        return this.initPos;
    }

    enterTrack(): void {
        this.onTrack = true;
        const startPos = this.game.getPlayer(this.playerID).getStartPos();
        this.move(startPos[0], startPos[1]);
        this.blockIndex = this.game.getTrackBlockIndex(startPos[0], startPos[1]);

    }

    leaveTrack(): void {
        this.onTrack = false;
        this.move(this.initPos[0], this.initPos[1]);
    }

    isOnTrack(): boolean {
        return this.onTrack;
    }
    
}