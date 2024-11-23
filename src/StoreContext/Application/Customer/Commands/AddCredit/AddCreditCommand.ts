export class AddCreditCommand {
    constructor(public readonly customerId: string, public readonly credit: number) {}
}