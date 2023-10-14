import { GameAbstractComponent } from "../components/abstract/game.abstract";

export class Block {

    private i: number;
    private j: number;
    private content: string;
    private color: string;

    constructor(i: number = 0, j: number = 0, content: string = 'EMPTY') {
        this.i = i;
        this.j = j;
        this.content = content;
        this.color = 'white';
    }

    getContent(): string {
        return this.content;
    }

    setContent(content: string): void  {
        this.content = content;
    }

    getColor(): string {
        return this.color;
    }

    setColor(color: string): void {
        this.color = color;
    }
}