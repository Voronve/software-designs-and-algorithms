export class Point {
    private x: number;
    private y: number;

    constructor();
    constructor(x: number, y:number);
    constructor(x?: number, y?: number) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
    
    get getX() {
        return this.x;
    }

    get getY() {
        return this.y;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;   
    }

    public distance(): number;
    public distance(other: Point): number;
    public distance(x: number, y: number): number;
    public distance(...args: [] | [Point] | number[]): number | string {
        const { x, y } = this.getTarget(...args);

        const catet1 = Math.abs(x - this.x);
        const catet2 = Math.abs(y - this.y);
            
        return Math.sqrt(catet1 ** 2 + catet2 ** 2);
    }

    private getTarget(...args: [] | [Point] | number[]) {
        if(args.length === 1) {
            return {
                x: (args[0] as Point).getX,
                y: (args[0] as Point).getY
            };
        } 
   
        const [x = 0, y = 0] = args as number[];
        return { x, y }
    }
}
