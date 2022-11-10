import { Shipper } from './types';

export class AirEastShipper implements Shipper {
    public letterCharge = 0.39;
    public packageCharge = 0.25;

    public getCost(weight: number): number {
        return this.packageCharge * weight + 10;
    }
}

export class PacificParserShipper implements Shipper {
    public letterCharge = 0.51;
    public packageCharge = 0.19;

    public getCost(weight: number): number {
        return (this.packageCharge + 0.02) * weight;
    }
}

export class ChicagoSprintShipper implements Shipper {
    public letterCharge = 0.42;
    public packageCharge = 0.20;

    public getCost(weight: number): number {
        return 0;
    }
}