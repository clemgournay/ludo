import { Pawn } from "./pawn";

export class Player {
    
    private id: string;
    private name: string;
    private color: string;
    private pawns: Array<Pawn> = [];
    private startPos: Array<number> = [0, 0];

    constructor(id: string, name: string, color: string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    getID(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getColor(): string {
        return this.color;
    }

    getPawns(): Array<Pawn> {
        return this.pawns;
    }

    setPawns(pawns: Array<Pawn>): void {
        this.pawns = pawns;
    }

    getPawn(index: number): Pawn {
        return this.pawns[index];
    }

    getStartPos(): Array<number> {
        return this.startPos;
    }

    setStartPos(coor: Array<number>): void {
        this.startPos = coor;
    }

}