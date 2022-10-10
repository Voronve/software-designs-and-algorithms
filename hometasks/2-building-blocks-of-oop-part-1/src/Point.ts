export class Point {
    private x: number;
    private y: number;

    constructor();
    constructor(x: number, y:number);
    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
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
    public distance( firstArg?: Point | number, secondArg?: number): number | string {
        let x: number;
        let y: number;
        if (arguments.length == 0) {
            x = 0;
            y = 0;
        } else if (typeof firstArg == 'number' && typeof secondArg == 'number') {
            x = firstArg;
            y = secondArg;
        } else if ( typeof firstArg == 'object' && firstArg instanceof Point ) {
            x = firstArg.getX;
            y = firstArg.getY;
        } else {
            
            return 'Wrong parameters!';
        }

        const catet1 = Math.abs(x - this.x);
            const catet2 = Math.abs(y - this.y);
            
            return Math.sqrt(catet1 * catet1 + catet2 * catet2);
    }
}
