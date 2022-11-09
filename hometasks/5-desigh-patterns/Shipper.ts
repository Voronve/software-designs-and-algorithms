export interface Shipper {
    charge: number,
    getCost(weight: number): number
}

export class AirEastShipper implements Shipper {
    charge = 39;
    
    public getCost(weight: number): number {
        return weight * this.charge;
    }
}

export class PacificParserShipper implements Shipper {
    charge = 51;
    
    public getCost(weight: number): number {
        return weight * this.charge;
    }
}

export class ChicagoSprintShipper implements Shipper {
    charge = 42;
    
    public getCost(weight: number): number {
        return weight * this.charge;
    }
}