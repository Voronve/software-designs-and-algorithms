import { Shipment, Marks } from "./types";
import { ShipmentDecorator } from "./ShipmentDecorator";
import { AirEastShipper, PacificParserShipper, ChicagoSprintShipper } from "./Shipper";
import { isStartsWith } from "./Utils";
const SHIPPERS = [PacificParserShipper, AirEastShipper, ChicagoSprintShipper ];
type Constructable<T = any> = new (...args: any[]) => T;

export class Client {
    public createShipment (
        shipmentID: number,
        weight: number,
        fromAddress: string,
        fromZipCode: string,
        toAddress: string,
        toZipCode: string,
        marks: Marks
    ): void {
        const shipment: Shipment = new ShipmentDecorator(
            shipmentID,
            weight,
            fromAddress,
            fromZipCode,
            toAddress,
            toZipCode,
            marks);

        const shipper = SHIPPERS.find(current => isStartsWith(current.ZIP_STARTS, +fromZipCode[0])) as unknown as Constructable;
        
        shipment.setStrategy(new shipper());
        

        console.log(shipment.ship());
    }
}