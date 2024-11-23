import { AddCreditService } from "../../../../Domain/Customer/Service/AddCreditService";
import { AddCreditCommand } from "./AddCreditCommand";
import { CustomerId } from "../../../../Domain/Customer/ValueObjects/CustomerId";
import { FindCustomerService } from "../../../../Domain/Customer/Service/FindCustomerService";

export class AddCreditCommandHandler {
    private addCreditService: AddCreditService;
    private findCustomerService: FindCustomerService;

    constructor(addCreditService: AddCreditService, findCustomerService: FindCustomerService) {
        this.addCreditService = addCreditService;
        this.findCustomerService = findCustomerService;
    }

    async handle(command: AddCreditCommand): Promise<void> {
        const customerId = new CustomerId(command.customerId);
        const customer = await this.findCustomerService.execute(customerId);

        if (!customer) {
            throw new Error('Customer not found');
        }

        await this.addCreditService.execute(customerId, command.credit);
    }
}