import { CustomerRepositoryInterface } from "../Repositories/CustomerRepositoryInterface";
import {CustomerId} from "../ValueObjects/CustomerId";

export class AddCreditService {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    public async execute(customerId: CustomerId, credit: number): Promise<void> {
        if (!this.isValidId(customerId.value)) {
            throw new Error("Invalid customer ID format.");
        }

        if (credit <= 0) {
            throw new Error("Credit amount must be greater than zero.");
        }

        const customer = await this.customerRepository.find(customerId);
        if (!customer) {
            throw new Error("Customer not found.");
        }

        customer.addCredit(credit);
        await this.customerRepository.save(customer);
    }

    private isValidId(id: string): boolean {
        const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return idPattern.test(id);
    }
}