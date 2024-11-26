export class CustomerNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CustomerNotFoundException";
    }
}