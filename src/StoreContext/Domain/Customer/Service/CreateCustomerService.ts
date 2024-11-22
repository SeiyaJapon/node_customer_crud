import {CustomerRepositoryInterface} from "../Repositories/CustomerRepositoryInterface";
import {CreateCustomerCommand} from "../../../Application/Customer/Commands/CreateCustomer/CreateCustomerCommand";
import {Customer} from "../Customer";
import {CustomerId} from "../ValueObjects/CustomerId";

export class CreateCustomerService {
    constructor(private readonly customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(id: CustomerId, name: string,  email: string, availableCredit: number) {
        const customer = new Customer(id, name, email, availableCredit);
        return this.customerRepository.save(customer);
    }
}