import { UpdateCustomerService } from "../../../../../../src/StoreContext/Domain/Customer/Service/UpdateCustomerService";
import { CustomerRepositoryInterface } from "../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";
import { Customer } from "../../../../../../src/StoreContext/Domain/Customer/Customer";
import { CustomerId } from "../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

describe('UpdateCustomerService', () => {
    let updateCustomerService: UpdateCustomerService;
    let mockCustomerRepository: jest.Mocked<CustomerRepositoryInterface>;

    beforeEach(() => {
        mockCustomerRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        updateCustomerService = new UpdateCustomerService(mockCustomerRepository);
    });

    it('should update an existing customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const customer = new Customer(customerId, 'John Doe', 'john@example.com', 100);

        mockCustomerRepository.update.mockResolvedValueOnce(customer);

        const result = await updateCustomerService.updateCustomer(customer);

        expect(result).toEqual(customer);
        expect(mockCustomerRepository.update).toHaveBeenCalledWith(customer);
    });

    it('should throw an error if the update fails', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const customer = new Customer(customerId, 'John Doe', 'john@example.com', 100);

        mockCustomerRepository.update.mockRejectedValueOnce(new Error('Update failed'));

        await expect(updateCustomerService.updateCustomer(customer)).rejects.toThrow('Update failed');
    });
});