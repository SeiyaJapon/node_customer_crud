import { CustomerRepositoryInterface } from "../Repositories/CustomerRepositoryInterface";
import { Customer } from "../Customer";

export class AddCreditService {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async addCredit(customer: Customer, amount: number): Promise<void> {
        customer.addCredit(amount);
        await this.customerRepository.save(customer);
    }
}