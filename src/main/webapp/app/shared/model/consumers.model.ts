import { IAddress } from 'app/shared/model//address.model';

export interface IConsumers {
    id?: number;
    name?: string;
    email?: string;
    phone?: number;
    websites?: string;
    adress?: IAddress;
}

export class Consumers implements IConsumers {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public phone?: number,
        public websites?: string,
        public adress?: IAddress
    ) {}
}
