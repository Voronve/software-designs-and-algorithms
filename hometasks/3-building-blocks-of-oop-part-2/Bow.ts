import { Weapon } from './Weapon';

export class Bow extends Weapon {
    private modifierLimit: number;

    constructor( baseDamage: number, baseDurability: number, value: number, weight: number ) {
        super('bow', baseDamage, baseDurability, value, weight);

        this.modifierLimit = 1;
    }

    public polish(): void {
        this.durabilityModifier += Weapon.MODIFIER_CHANGE_RATE;

        if(this.durabilityModifier > this.modifierLimit) {
            this.damageModifier =  this.modifierLimit;
        }
    }
}