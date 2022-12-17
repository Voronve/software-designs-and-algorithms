import {Item} from './Item';

export abstract class Weapon extends Item {
    public static MODIFIER_CHANGE_RATE: number;
    protected baseDamage: number;
    protected baseDurability: number;
    protected damageModifier: number;
    protected durabilityModifier: number;

    constructor(
        name: string,
        baseDamage: number,
        baseDurability: number,
        value: number,
        weight: number) {
            super(name, value, weight);

            Weapon.MODIFIER_CHANGE_RATE = 0.05;
            this.baseDamage = Number(baseDamage.toFixed(2));
            this.baseDurability = Number(baseDurability.toFixed(2));
            this.damageModifier = 0;
            this.durabilityModifier = 0;
    }

    public get getDamage() {
        return this.baseDamage + this.damageModifier;
    }

    public get getDurability() {
        return this.baseDurability + this.durabilityModifier;
    }

    public toString(): string {
        return `${super.toString()}, Damage: ${this.getDamage}, Durability: ${this.getDurability}%`
    }

    public use(): string {

        if( this.getDurability <= 0 ) {
            return `You can't use the ${this.name}, it is broken.`;
        }
        
        const successMessage = `You use the ${this.name}, dealing ${this.getDamage} points of damage.`;

        return this.getDurability > 0 
            ? successMessage 
            : `${successMessage}\nThe ${this.name} breaks.`;
    }

    public abstract polish(): void;

}