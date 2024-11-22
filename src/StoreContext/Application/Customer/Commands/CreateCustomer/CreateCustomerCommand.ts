import {CommandInterface} from "../../../../../SharedContext/Application/Command/CommandInterface";
import { CustomerId } from "../../../../Domain/Customer/ValueObjects/CustomerId";

export class CreateCustomerCommand implements CommandInterface {
    public readonly id: CustomerId;

    constructor(
        id: string | null,
        public readonly name: string,
        public readonly email: string,
        public readonly availableCredit: number
    ) {
        this.id = id ? new CustomerId(id) : CustomerId.generate();
    }
}