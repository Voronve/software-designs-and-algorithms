import {Shipment, PackageType, Shipper} from './types';

export class BaseShipment implements Shipment {
    public shipmentID: number
    public weight: number
    public fromAddress: string
    public fromZipCode: string
    public toAddress: string
    public toZipCode: string
    private shippingStrategy: Shipper

    constructor(
        shipmentID: number,
        weight: number,
        fromAddress: string,
        fromZipCode: string,
        toAddress: string,
        toZipCode: string
    ) {
        this.shipmentID = shipmentID ?? MockedPersistance.getId();
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode; 
    }

    public setStrategy(strategy: Shipper): void {
        this.shippingStrategy = strategy;
    }

    private getCost(): number {
        
        return this.shippingStrategy.getCost(this.weight);
    }

    public ship(): string {

        return `
            Id: ${this.shipmentID}\n
            Sender: ${this.fromAddress}\n
            Resiever: ${this.toAddress}\n
            Cost: ${this.getCost()}\n
        `
    }
}

class MockedPersistance {
    private static lastId = 0;
 
    public static getId () {
       return ++this.lastId;
    }
}

