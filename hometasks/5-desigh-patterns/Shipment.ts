import {Shipment, PackageType, Shipper} from './types';

export class BaseShipment implements Shipment {
    private static shipmentID: number = 0;
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
        this.shipmentID = shipmentID;
        this.weight = weight;
        this.fromAddress = fromAddress;
        this.fromZipCode = fromZipCode;
        this.toAddress = toAddress;
        this.toZipCode = toZipCode; 
    }

    private getShipmentID(): number {
        return ++BaseShipment.shipmentID;
    }

    public setStrategy(strategy: Shipper): void {
        this.shippingStrategy = strategy;
    }

    private getCost(): number {
        switch (true) {
            case this.weight <= PackageType.letter :

                return this.weight * this.shippingStrategy.letterCharge;
            case this.weight <= PackageType.package :

                return this.weight * this.shippingStrategy.packageCharge;
            default:

                return this.shippingStrategy.getCost(this.weight);
        }
    }

    public ship(): string {
        this.shipmentID = this.shipmentID ?? this.getShipmentID();

        return `
            Id: ${this.shipmentID}\n
            Sender: ${this.fromAddress}\n
            Resiever: ${this.toAddress}\n
            Cost: ${this.getCost()}\n
        `
    }
}

