import { CommandInterface } from "../../../../../SharedContext/Application/Command/CommandInterface";

export class UpdateCustomerCommand implements CommandInterface {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly availableCredit: number;

    constructor(id: string, name: string, email: string, availableCredit: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.availableCredit = availableCredit;
    }
}