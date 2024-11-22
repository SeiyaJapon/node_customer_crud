import { v4 as uuidv4 } from 'uuid';

export class CustomerId {
    constructor(public readonly value: string) {}

    static generate(): CustomerId {
        return new CustomerId(uuidv4());
    }
}