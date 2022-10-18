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
        const points = this.points
            .map((point, index) => `v${index+1}=${point}`)
            .join(',');
        return `Triangle[${points}]`;
    }

    public getType(): string {

        const uniqueSides = this.points.reduce((acc, point, index)=> {
            const next = (index + 1) % this.points.length;
            const nextPoint = this.points[next];
         
            const side = point.distance(nextPoint).toFixed(2);
            return acc.add(side);
         }, new Set<string>());

        if(uniqueSides.size === 1) return 'equilateral triangle';

        return uniqueSides.size === 2
            ? 'isosceles triangle'
            : 'scalene triangle';
    }
}
