import {CreateCustomerCommand} from "./CreateCustomerCommand";
import {CreateCustomerService} from "../../../../Domain/Customer/Service/CreateCustomerService";

export class CreateCustomerCommandHandler {
    private createCustomerService: CreateCustomerService;

    constructor(createCustomerService: CreateCustomerService) {
        this.createCustomerService = createCustomerService;
    }

    async handle(command: CreateCustomerCommand) {
        return this.createCustomerService.execute(
            command.id, command.name, command.email, command.availableCredit
        );
    }
}