export interface IAddress {
    id?: number;
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: number;
}

export class Address implements IAddress {
    constructor(public id?: number, public street?: string, public suite?: string, public city?: string, public zipcode?: number) {}
}
