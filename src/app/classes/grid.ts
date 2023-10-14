import { GameAbstractComponent } from "../components/abstract/game.abstract";
import { Block } from "./block";

export class Grid {

    public width: number;
    public height: number;
    public blockSize: number;
    private blocks: any = {};

    constructor(width: number = 10, height: number = 10, blockSize: number = 50) {
        this.width = width;
        this.height = height;
        this.blockSize = blockSize;
        this.blocks = {};
        this.build();
    }

    build(): void {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.blocks[`${i}-${j}`] = new Block(i, j, 'EMPTY');
            }
        }
    }

    getBlock(i: number, j: number): Block {
        const coor = `${i}-${j}` as keyof typeof this.blocks;
        return this.blocks[coor];
    }
}