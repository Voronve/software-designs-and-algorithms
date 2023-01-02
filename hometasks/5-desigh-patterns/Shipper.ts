// import { Shipper } from './types';

import { PackageType } from "./types";

export abstract class Shipper {
    abstract readonly letterCharge: number;
    abstract readonly packageCharge: number;
  
    protected abstract getOversizedCost(weight: number): number;
    protected getPackageCost = (weight: number) => weight * this.packageCharge;
    protected getLetterCost = (weight: number) => weight * this.letterCharge;
  
    public getCost(weight: number) {
        if(weight > PackageType.package) {
           return this.getOversizedCost(weight);
        }
  
        return weight <= PackageType.letter 
               ? this.getLetterCost(weight) 
               : this.getPackageCost(weight) ;
    }
  }

export class AirEastShipper extends Shipper {
    public static ZIP_STARTS = [0, 1, 2, 3];
    public letterCharge: number;
    public packageCharge: number;
    public extraCharge: number;

    constructor() {
        super();
        this.letterCharge = 0.39;
        this.packageCharge = 0.25;
        this.extraCharge = 10;
    }

    getOversizedCost(weight: number) {
        return this.getPackageCost(weight) + this.extraCharge;
    }
}

export class PacificParserShipper extends Shipper {
    public static ZIP_STARTS = [7, 8, 9];
    public letterCharge: number;
    public packageCharge: number;
    public extraCharge: number;

    constructor() {
        super();
        this.letterCharge = 0.51;
        this.packageCharge = 0.19;
        this.extraCharge = 0.02;
    }

    getOversizedCost(weight: number) {
        return this.getPackageCost(weight) + weight * this.extraCharge;
    }
}

export class ChicagoSprintShipper extends Shipper {
    public static ZIP_STARTS = [4, 5, 6];
    public letterCharge: number;
    public packageCharge: number;

    constructor() {
        super();
        this.letterCharge = 0.42;
        this.packageCharge = 0.20;
    }
    getOversizedCost(weight: number) {
        return this.getPackageCost(weight);
    }
}