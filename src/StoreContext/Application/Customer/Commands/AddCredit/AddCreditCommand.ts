export class AddCreditCommand {
    constructor(public readonly customerId: string, public readonly amount: number) {}
}