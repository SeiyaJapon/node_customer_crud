import {CustomerId} from "./ValueObjects/CustomerId";

export class Customer {
    constructor(
        public _id: CustomerId,
        public _name: string,
        public _email: string,
        public _availableCredit: number
    ) {}

    get id(): CustomerId {
        return this._id;
    }

    set id(value: CustomerId) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get availableCredit(): number {
        return this._availableCredit;
    }

    set availableCredit(value: number) {
        this._availableCredit = value;
    }

    addCredit(amount: number): void {
        this.availableCredit += amount;
    }
}
