export type BrickColor = {
    background: string,
    border: string,
}

const BRICK_COLORS: BrickColor[] = [
    {
        background: 'darkblue',
        border: 'blue'
    },
    {
        background: 'darkred',
        border: 'crimson'
    },
    {
        background: 'green',
        border: 'lightgreen'
    },
    {
        background: 'grey',
        border: 'lightgrey'
    }
]

export class LegoBrick {
    private height: number;
    private width: number;
    private numberOfStuds: number;
    private color: BrickColor;
    constructor(height: number, width: number, color: BrickColor) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.numberOfStuds = height * width;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getColor() {
        return this.color;
    }

    getNumberOfStuds() {
        return this.numberOfStuds;
    }

    toString() {
        return `${this.getWidth()}x${this.getHeight()} (${this.getNumberOfStuds()})`;
    }

    static buildRandomBrick() {
        return new LegoBrick(
            Math.ceil(Math.random() * 10),
            Math.ceil(Math.random() * 10),
            BRICK_COLORS[Math.ceil(Math.random() * BRICK_COLORS.length - 1)]
        )
    }
}
