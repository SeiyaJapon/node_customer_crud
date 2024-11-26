import { DeleteCustomerService } from "../../../../Domain/Customer/Service/DeleteCustomerService";
import { DeleteCustomerCommand } from "./DeleteCustomerCommand";
import { CustomerId } from "../../../../Domain/Customer/ValueObjects/CustomerId";

export class DeleteCustomerCommandHandler {
    private deleteCustomerService: DeleteCustomerService;

    constructor(deleteCustomerService: DeleteCustomerService) {
        this.deleteCustomerService = deleteCustomerService;
    }

    async handle(command: DeleteCustomerCommand): Promise<void> {
        const customerId = new CustomerId(command.customerId);
        await this.deleteCustomerService.deleteCustomer(customerId);
    }
}