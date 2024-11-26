import {FindAllCustomerService} from "../../../../Domain/Customer/Service/FindAllCustomerService";
import {FindAllCustomersQuery} from "./FindAllCustomersQuery";

export class FindAllCustomersQueryHandler {
    private findAllCustomerService: FindAllCustomerService;

    constructor(findAllCustomerService: FindAllCustomerService) {
        this.findAllCustomerService = findAllCustomerService;
    }

    async handle(query: FindAllCustomersQuery) {
        return this.findAllCustomerService.execute();
    }
}