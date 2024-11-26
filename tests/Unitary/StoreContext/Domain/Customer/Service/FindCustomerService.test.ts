import { FindCustomerService } from "../../../../../../src/StoreContext/Domain/Customer/Service/FindCustomerService";
import { CustomerRepositoryInterface } from "../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";
import { Customer } from "../../../../../../src/StoreContext/Domain/Customer/Customer";
import { CustomerId } from "../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

describe('FindCustomerService', () => {
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
    });

    it('should find an existing customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const customer = new Customer(customerId, 'John Doe', 'john@example.com', 100);

        mockCustomerRepository.find.mockResolvedValueOnce(customer);

        const result = await findCustomerService.execute(customerId);

        expect(result).toEqual(customer);
    });

    it('should return null if the customer does not exist', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');

        mockCustomerRepository.find.mockResolvedValueOnce(null);

        const result = await findCustomerService.execute(customerId);

        expect(result).toBeNull();
    });
});