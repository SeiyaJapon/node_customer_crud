import {CustomerRepositoryInterface} from "../Repositories/CustomerRepositoryInterface";

export class FindAllCustomerService {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute() {
        return this.customerRepository.findAll();
    }
}