import {Item} from './Item';

export abstract class Weapon extends Item {
    public MODIFIER_CHANGE_RATE: number = 0.05;
    protected baseDamage: number;
    protected baseDurability: number;
    protected damageModifier: number = 0;
    protected durabilityModifier: number = 0;

    constructor(
        name: string,
        baseDamage: number,
        baseDurability: number,
        value: number,
        weight: number) {
            super(name, value, weight);

            this.baseDamage = baseDamage;
            this.baseDurability = baseDurability;
    }

    public get getDamage() {
        return +(this.baseDamage + this.damageModifier).toFixed(2);
    }

    public get getDurability() {
        return +((this.baseDurability + this.durabilityModifier) * 100).toFixed(2);
    }

    public toString(): string {
        return `${super.toString()}, Damage: ${this.getDamage}, Durability: ${this.getDurability}%`
    }

    public use(): string {

        if( this.getDurability <= 0 ) {
            return `You can't use the ${this.name}, it is broken.`;
        }
        
        let response = `You use the ${this.name}, dealing ${this.getDamage} points of damage.`;

        this.durabilityModifier -= this.MODIFIER_CHANGE_RATE;

        if( this.getDurability <= 0 ) {
            response += ' The hammer breaks.';
        }

        return response;
    }

    public abstract polish(): void;

}