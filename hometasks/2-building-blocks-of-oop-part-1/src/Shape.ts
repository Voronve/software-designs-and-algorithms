import { Point } from './Point';

export abstract class Shape {
  abstract getType(): string;
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);
  constructor(points: Point[], color?: string, filled?: boolean) {
    if(points?.length && points.length < 3) {
      throw new Error('Not enough points');
    }
    this.color = color || 'green';
    this.filled = typeof filled == 'boolean' ? filled : true;
    this.points = points;
  }

   
  public toString(): string {
    let objString = `A Shape with color of ${this.color} and${this.filled ? '' : ' not'} filled. Points: `
    this.points.map( (point, index) => {
      objString = objString + `${point.toString()}`;
      objString += index < this.points.length - 1 ? ', ' : '.';
    });

    return objString;
  }

  public getPerimeter(): number {
    let perimeter = 0;
    this.points.map( (point, index, arr) => {
      if(index === arr.length - 1) {
        perimeter += point.distance(arr[0]);
      } else {
        perimeter += point.distance(arr[index +1]);
      }
    });

    return perimeter;
  }
}
