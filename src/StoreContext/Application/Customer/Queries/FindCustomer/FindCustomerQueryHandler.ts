import {FindCustomerQuery} from "./FindCustomerQuery";
import {FindCustomerService} from "../../../../Domain/Customer/Service/FindCustomerService";

export class FindCustomerQueryHandler {
    private findCustomerService: FindCustomerService;

    constructor(findCustomerService: FindCustomerService) {
        this.findCustomerService = findCustomerService;
    }

    async handle(query: FindCustomerQuery) {
        return this.findCustomerService.execute(query.id);
    }
}