import { DeleteCustomerService } from "../../../../../../src/StoreContext/Domain/Customer/Service/DeleteCustomerService";
import { CustomerRepositoryInterface } from "../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";
import { CustomerId } from "../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

describe('DeleteCustomerService', () => {
    let deleteCustomerService: DeleteCustomerService;
    let mockCustomerRepository: jest.Mocked<CustomerRepositoryInterface>;

    beforeEach(() => {
        mockCustomerRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        deleteCustomerService = new DeleteCustomerService(mockCustomerRepository);
    });

    it('should delete an existing customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');

        await deleteCustomerService.deleteCustomer(customerId);

        expect(mockCustomerRepository.delete).toHaveBeenCalledWith(customerId);
    });

    it('should throw an error if the deletion fails', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');

        mockCustomerRepository.delete.mockRejectedValueOnce(new Error('Deletion failed'));

        await expect(deleteCustomerService.deleteCustomer(customerId)).rejects.toThrow('Deletion failed');
    });
});