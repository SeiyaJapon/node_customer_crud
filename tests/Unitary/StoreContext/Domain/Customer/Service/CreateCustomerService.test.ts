import { CreateCustomerService } from "../../../../../../src/StoreContext/Domain/Customer/Service/CreateCustomerService";
import { FindCustomerService } from "../../../../../../src/StoreContext/Domain/Customer/Service/FindCustomerService";
import { CustomerRepositoryInterface } from "../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";
import { Customer } from "../../../../../../src/StoreContext/Domain/Customer/Customer";
import { CustomerId } from "../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

const availableCredit = 100;

describe('CreateCustomerService', () => {
    let createCustomerService: CreateCustomerService;
    let findCustomerService: FindCustomerService;
    let mockCustomerRepository: jest.Mocked<CustomerRepositoryInterface>;

    beforeEach(() => {
        mockCustomerRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        findCustomerService = new FindCustomerService(mockCustomerRepository);
        createCustomerService = new CreateCustomerService(mockCustomerRepository, findCustomerService);
    });

    it('should create a new customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const customer = new Customer(customerId, 'John Doe', 'john@example.com', availableCredit);

        jest.spyOn(findCustomerService, 'execute').mockResolvedValueOnce(null);

        await createCustomerService.execute(customerId, 'John Doe', 'john@example.com', availableCredit);

        expect(mockCustomerRepository.save).toHaveBeenCalledWith(expect.objectContaining({
            id: customerId,
            name: 'John Doe',
            email: 'john@example.com',
        }));
    });

    it('should throw an error if the customer already exists', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const customer = new Customer(customerId, 'John Doe', 'john@example.com', availableCredit);

        jest.spyOn(findCustomerService, 'execute').mockResolvedValueOnce(customer);

        await expect(createCustomerService.execute(customerId, 'John Doe', 'john@example.com', availableCredit)).rejects.toThrow('Customer already exists');
    });
});