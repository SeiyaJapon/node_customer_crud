import { CustomerRepositoryInterface } from "../Repositories/CustomerRepositoryInterface";
import { CustomerId } from "../ValueObjects/CustomerId";

export class DeleteCustomerService {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async deleteCustomer(customerId: CustomerId): Promise<void> {
        await this.customerRepository.delete(customerId);
    }
}