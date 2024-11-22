import {FindCustomerQuery} from "./FindCustomerQuery";
import {CustomerId} from "../../../../Domain/Customer/ValueObjects/CustomerId";
import {FindCustomerService} from "../../../../Domain/Customer/Service/FindCustomerService";

export class FindCustomerQueryHandler {
    private findCustomerService: FindCustomerService;

    constructor(findCustomerService: FindCustomerService) {
        this.findCustomerService = findCustomerService;
    }

    async handle(query: FindCustomerQuery) {
        const customerId = new CustomerId(query.id);
        return this.findCustomerService.execute(customerId);
    }
}