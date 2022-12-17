import { Weapon } from './Weapon';

export class Sword extends Weapon {
    private maxModifier: number;
    private modifierLimit: number;
    constructor( baseDamage: number, baseDurability: number, value: number, weight: number ) {
        super('sword', baseDamage, baseDurability, value, weight);

        this.modifierLimit = 0.25;
        this.maxModifier = this.baseDamage * this.modifierLimit;
    }

    public polish(): void {
        this.damageModifier += Weapon.MODIFIER_CHANGE_RATE;

        if(this.damageModifier > this.maxModifier) {
            this.damageModifier = this.maxModifier;
        }
    }
}