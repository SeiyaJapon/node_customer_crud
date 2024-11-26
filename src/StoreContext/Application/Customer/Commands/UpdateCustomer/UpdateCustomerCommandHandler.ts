import { UpdateCustomerCommand } from "./UpdateCustomerCommand";
import { UpdateCustomerService } from "../../../../Domain/Customer/Service/UpdateCustomerService";
import { Customer } from "../../../../Domain/Customer/Customer";
import {CustomerId} from "../../../../Domain/Customer/ValueObjects/CustomerId";

export class UpdateCustomerCommandHandler {
    private updateCustomerService: UpdateCustomerService;

    constructor(updateCustomerService: UpdateCustomerService) {
        this.updateCustomerService = updateCustomerService;
    }

    async handle(command: UpdateCustomerCommand): Promise<void> {
        const customer = new Customer(new CustomerId(command.id), command.name, command.email, command.availableCredit);
        await this.updateCustomerService.updateCustomer(customer);
    }
}