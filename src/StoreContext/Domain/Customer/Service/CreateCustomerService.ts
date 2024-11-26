import { CustomerRepositoryInterface } from "../Repositories/CustomerRepositoryInterface";
import { Customer } from "../Customer";
import { CustomerId } from "../ValueObjects/CustomerId";
import { FindCustomerService } from "./FindCustomerService";

export class CreateCustomerService {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface,
        private readonly findCustomerService: FindCustomerService
    ) {}

    async execute(customerId: CustomerId, name: string, email: string, initialCredit: number): Promise<void> {
        const existingCustomer = await this.findCustomerService.execute(customerId);

        if (existingCustomer) {
            throw new Error('Customer already exists');
        }

        const customer = new Customer(customerId, name, email, initialCredit);

        await this.customerRepository.save(customer);
    }
}