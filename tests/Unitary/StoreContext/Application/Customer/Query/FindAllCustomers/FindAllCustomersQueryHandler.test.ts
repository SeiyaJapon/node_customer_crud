import { FindAllCustomersQueryHandler } from "../../../../../../../src/StoreContext/Application/Customer/Queries/FindAllCustomers/FindAllCustomersQueryHandler";
import { FindAllCustomerService } from "../../../../../../../src/StoreContext/Domain/Customer/Service/FindAllCustomerService";
import { FindAllCustomersQuery } from "../../../../../../../src/StoreContext/Application/Customer/Queries/FindAllCustomers/FindAllCustomersQuery";
import { Customer } from "../../../../../../../src/StoreContext/Domain/Customer/Customer";
import { CustomerId } from "../../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

jest.mock("../../../../../../../src/StoreContext/Domain/Customer/Service/FindAllCustomerService");

describe('FindAllCustomersQueryHandler', () => {
    let findAllCustomersQueryHandler: FindAllCustomersQueryHandler;
    let mockFindAllCustomerService: jest.Mocked<FindAllCustomerService>;

    beforeEach(() => {
        mockFindAllCustomerService = new FindAllCustomerService({} as any) as jest.Mocked<FindAllCustomerService>;
        mockFindAllCustomerService.execute = jest.fn();

        findAllCustomersQueryHandler = new FindAllCustomersQueryHandler(mockFindAllCustomerService);
    });

    it('should return all customers', async () => {
        const customers = [
            new Customer(new CustomerId('123e4567-e89b-12d3-a456-426614174000'), 'John Doe', 'john@example.com', 100),
            new Customer(new CustomerId('123e4567-e89b-12d3-a456-426614174001'), 'Jane Doe', 'jane@example.com', 200)
        ];
        mockFindAllCustomerService.execute.mockResolvedValueOnce(customers);

        const query = new FindAllCustomersQuery();
        const result = await findAllCustomersQueryHandler.handle(query);

        expect(result).toEqual(customers);
        expect(mockFindAllCustomerService.execute).toHaveBeenCalled();
    });

    it('should throw an error if the service fails', async () => {
        mockFindAllCustomerService.execute.mockRejectedValueOnce(new Error('Service failed'));

        const query = new FindAllCustomersQuery();

        await expect(findAllCustomersQueryHandler.handle(query)).rejects.toThrow('Service failed');
    });
});