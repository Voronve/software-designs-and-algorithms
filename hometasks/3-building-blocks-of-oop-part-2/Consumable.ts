import { Item } from './Item';

export abstract class Consumable extends Item {
    private consumed: boolean;
    private spoiled: boolean;

    constructor( name: string, value: number, weight: number, spoiled: boolean ) {
        super(name, value, weight);

        this.consumed = false;
        this.spoiled = spoiled; 
    }

    public eat(): string {
        const respond = `You eat the ${this.getName}.`;

        if(!this.spoiled) return respond;

        return `${respond}\nYou feel sick.`;
    }

    public use(): string {
        if(!this.consumed) {
            this.consumed = true;
            return this.eat();
        }

        return `There is nothing left of the ${this.name} to consume`;
    }

    public get isConsumed(): boolean {
        return this.consumed;
    }

    public set setConsumed( consumed: boolean ) {
        this.consumed = consumed;
    }
}