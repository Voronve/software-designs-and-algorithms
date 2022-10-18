import { Comparable } from './Comparable';

let id = 0;

export abstract class Item implements Comparable<Item> {
    public readonly id: number;
    public name: string;
    public value: number;
    public weight: number;

    constructor( name: string, value: number, weight: number ) {
        this.id = id++;
        this.name = name;
        this.value = value;
        this.weight = weight;
    }

    static get numberOfItems() {
        return id;
    }

    static reset() {
        id = 0;
    }

    public compareTo(other: Item): number {
        if(this.value > other.value) return 1
        else if (this.value < other.value) return -1
        else return this.name.toLowerCase() > other.name.toLowerCase() ? 1 : -1;
    }

    public toString(): string {
        return `${this.name} - Value: ${this.value}, Weight: ${this.weight.toFixed(2)}`;
    }

    public get getId(): number {
        return this.id;
    }

    public get getValue(): number {
        return this.value;
    }

    public get getName(): string {
        return this.name;
    }

    public get getWeight(): number {
        return this.weight;
    }

    public setValue(price: number): void {
        this.value = price;
    };

    public set setName(name: string) {
        this.name = name;
    };

    public set setWeight(weight: number) {
        this.weight = weight;
    };

    public abstract use(): void;
}
