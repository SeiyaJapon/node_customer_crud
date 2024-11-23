import {CommandInterface} from "../../../../../SharedContext/Application/Command/CommandInterface";

export class DeleteCustomerCommand implements CommandInterface {
    public readonly customerId: string;

    constructor(customerId: string) {
        this.customerId = customerId;
    }
}