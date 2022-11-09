import { Shipment } from "./Shipment";

export class Client {

    public createShipment (
        shipmentID: number,
        weight: number,
        fromAddress: string,
        fromZipCode: string,
        toAddress: string,
        toZipCode: string
    ): void {
        const shipment = new Shipment(
            shipmentID,
            weight,
            fromAddress,
            fromZipCode,
            toAddress,
            toZipCode);
        console.log(shipment.ship());
    }
}