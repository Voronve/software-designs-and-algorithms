import { Shipment } from "./Shipment";
import { AirEastShipper, PacificParserShipper, ChicagoSprintShipper } from "./Shipper";

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

        switch( fromZipCode[0] ) {
            case '4':
            case '5':
            case '6':
                shipment.setStrategy(new ChicagoSprintShipper());
                break;
            case '7':
            case '8':
            case '9':
                shipment.setStrategy(new PacificParserShipper());
                break;
            default:
                shipment.setStrategy(new AirEastShipper());
        }

        console.log(shipment.ship());
    }
}