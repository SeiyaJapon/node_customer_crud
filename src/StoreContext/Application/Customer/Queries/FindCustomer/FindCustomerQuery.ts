import {CommandInterface} from "../../../../../SharedContext/Application/Command/CommandInterface";
import {CustomerId} from "../../../../Domain/Customer/ValueObjects/CustomerId";

export class FindCustomerQuery implements CommandInterface {
    public readonly id: CustomerId;

    constructor(id: string | null) {
        this.id = id ? new CustomerId(id) : CustomerId.generate();
    }
}