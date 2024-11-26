import { FindAllCustomerService } from "../../../../../../src/StoreContext/Domain/Customer/Service/FindAllCustomerService";
import { CustomerRepositoryInterface } from "../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";
import { Customer } from "../../../../../../src/StoreContext/Domain/Customer/Customer";
import { CustomerId } from "../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

describe('FindAllCustomerService', () => {
    let findAllCustomerService: FindAllCustomerService;
    let mockCustomerRepository: jest.Mocked<CustomerRepositoryInterface>;

    beforeEach(() => {
        mockCustomerRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        findAllCustomerService = new FindAllCustomerService(mockCustomerRepository);
    });

    it('should return all customers', async () => {
        const customers = [
            new Customer(new CustomerId('123e4567-e89b-12d3-a456-426614174000'), 'John Doe', 'john@example.com', 100),
            new Customer(new CustomerId('123e4567-e89b-12d3-a456-426614174001'), 'Jane Doe', 'jane@example.com', 200)
        ];

        mockCustomerRepository.findAll.mockResolvedValueOnce(customers);

        const result = await findAllCustomerService.execute();

        expect(result).toEqual(customers);
    });

    it('should return an empty array if no customers exist', async () => {
        mockCustomerRepository.findAll.mockResolvedValueOnce([]);

        const result = await findAllCustomerService.execute();

        expect(result).toEqual([]);
    });
});