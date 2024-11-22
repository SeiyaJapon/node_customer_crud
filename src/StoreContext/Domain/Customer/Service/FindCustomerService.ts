import {CustomerRepositoryInterface} from "../Repositories/CustomerRepositoryInterface";
import {CustomerId} from "../ValueObjects/CustomerId";

export class FindCustomerService {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(customerId: CustomerId) {
        return this.customerRepository.find(customerId);
    }
}