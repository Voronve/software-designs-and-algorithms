export interface Shipment {
    setStrategy(strategy: Shipper): void,
    ship(): string
}

export interface Shipper {
    letterCharge: number,
    packageCharge: number,
    getCost(weight: number): number
}

export enum PackageType {
    letter = 15,
    package = 160
};

export interface Marks {
    fragile?: 'fragile',
    doNotLeave?: 'do not leave if address not at home',
    return?: 'return receipt requested'
}

