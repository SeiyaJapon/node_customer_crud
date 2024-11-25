import {AddCreditService} from "../../../../../../src/StoreContext/Domain/Customer/Service/AddCreditService";
import {
    CustomerRepositoryInterface
} from "../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";
import { Customer } from "../../../../../../src/StoreContext/Domain/Customer/Customer";
import {CustomerId} from "../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

describe('AddCreditService', () => {
    let addCreditService: AddCreditService;
    let mockCustomerRepository: jest.Mocked<CustomerRepositoryInterface>;
    let mockCustomer: Customer;

    beforeEach(() => {
        mockCustomerRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        mockCustomer = new Customer(new CustomerId('123e4567-e89b-12d3-a456-426614174000'), 'John Doe', 'john@example.com', 100);

        addCreditService = new AddCreditService(mockCustomerRepository);
    });

    it('should throw an error if customer ID format is invalid', async () => {
        await expect(addCreditService.execute(new CustomerId('invalid-id'), 50)).rejects.toThrow('Invalid customer ID format.');
    });

    it('should throw an error if credit amount is zero or negative', async () => {
        await expect(addCreditService.execute(new CustomerId('123e4567-e89b-12d3-a456-426614174000'), 0)).rejects.toThrow('Credit amount must be greater than zero.');
        await expect(addCreditService.execute(new CustomerId('123e4567-e89b-12d3-a456-426614174000'), -50)).rejects.toThrow('Credit amount must be greater than zero.');
    });

    it('should throw an error if customer is not found', async () => {
        mockCustomerRepository.find.mockResolvedValueOnce(null);

        await expect(addCreditService.execute(new CustomerId('123e4567-e89b-12d3-a456-426614174000'), 50)).rejects.toThrow('Customer not found.');
    });

    it('should add credit to the customer and save it', async () => {
        const initialCredit = mockCustomer.availableCredit;
        const creditToAdd = 50;

        mockCustomerRepository.find.mockResolvedValueOnce(mockCustomer);

        await addCreditService.execute(mockCustomer.id, creditToAdd);

        expect(mockCustomer.availableCredit).toBe(initialCredit + creditToAdd);
        expect(mockCustomerRepository.save).toHaveBeenCalledWith(mockCustomer);
    });
});