import { Shape } from './Shape';
import { Point } from './Point';

export class Triangle extends Shape {
    constructor(point1: Point, point2: Point, point3: Point);
    constructor(point1: Point, point2: Point, point3: Point, color: string, filled: boolean);
    constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
        
        if(!point1 || !point2 || !point3) {
            throw new Error(`Points number is not correct`);
        }

        const points: Point[] = [];
        points.push(point1);
        points.push(point2);
        points.push(point3);

        if (color && filled) {
            super(points, color, filled);
        } else {
            super(points);
        }
        
    }

    public toString(): string {
        let objString = `Triangle[`
        this.points.map( (point, index, arr) => {
            objString = objString + `v${index+1}=(${point.getX}, ${point.getY})`;
            if(index < arr.length - 1) {
                objString += ',';
            } else {
                objString += ']';
            }
        });

        return objString;
    }

    public getType(): string {
        
        const equalityLimit = 0.01;
        const side1 = this.points[0].distance(this.points[1]);
        const side2 = this.points[1].distance(this.points[2]);
        const side3 = this.points[2].distance(this.points[0]);
        
        let equals = 0;
        equals += Math.abs(side1 - side2) < equalityLimit ? 1 : 0;
        equals += Math.abs(side1 - side3) < equalityLimit ? 1 : 0;
        equals += Math.abs(side2 - side3) < equalityLimit ? 1 : 0;

        return equals == 3
            ? 'equilateral triangle'
            : equals == 1
            ? 'isosceles triangle'
            : 'scalene triangle'
    }
}
