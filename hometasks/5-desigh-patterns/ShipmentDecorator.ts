import { BaseShipment } from './Shipment';
import { Shipment, Marks, Shipper } from './types';

export class ShipmentDecorator implements Shipment {
    
    private baseShipment: Shipment;
    private marks: Marks;

    constructor(
        shipmentID: number,
        weight: number,
        fromAddress: string,
        fromZipCode: string,
        toAddress: string,
        toZipCode: string,
        marks: Marks
    ) {
        this.marks = marks;
        this.baseShipment = new BaseShipment(
            shipmentID,
            weight,
            fromAddress,
            fromZipCode,
            toAddress,
            toZipCode);
    }

    private getMarks(marks: Marks): string {
        let marksString = '';
        for (const value of Object.values(marks)) {
            marksString += `**MARK ${(value as string).toUpperCase()}**\n`;
          }
          return marksString;
    }

    public setStrategy(strategy: Shipper): void {
        this.baseShipment.setStrategy(strategy);
    }

    public ship(): string {
        const marks = this.getMarks(this.marks);
        const baseShip = this.baseShipment.ship();
        return baseShip + marks;
    }
}