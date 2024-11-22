import {CommandInterface} from "../../../../../SharedContext/Application/Command/CommandInterface";

export class FindCustomerQuery implements CommandInterface {
    constructor(public readonly id: string) {}
}