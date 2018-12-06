export interface IPosts {
    id?: number;
    title?: string;
    body?: string;
    user?: number;
}

export class Posts implements IPosts {
    constructor(public id?: number, public title?: string, public body?: string, public user?: number) {}
}
