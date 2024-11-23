import { CustomerRepositoryInterface } from "../Repositories/CustomerRepositoryInterface";
import {Customer} from "../Customer";

export class UpdateCustomerService {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async updateCustomer(customer: Customer): Promise<Customer> {
        return await this.customerRepository.update(customer);
    }
}