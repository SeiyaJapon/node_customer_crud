import { FindCustomerQueryHandler } from "../../../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQueryHandler";
import { FindCustomerService } from "../../../../../../../src/StoreContext/Domain/Customer/Service/FindCustomerService";
import { FindCustomerQuery } from "../../../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import { Customer } from "../../../../../../../src/StoreContext/Domain/Customer/Customer";
import { CustomerId } from "../../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

jest.mock("../../../../../../../src/StoreContext/Domain/Customer/Service/FindCustomerService");

describe('FindCustomerQueryHandler', () => {
    let findCustomerQueryHandler: FindCustomerQueryHandler;
    let mockFindCustomerService: jest.Mocked<FindCustomerService>;

    beforeEach(() => {
        mockFindCustomerService = new FindCustomerService({} as any) as jest.Mocked<FindCustomerService>;
        mockFindCustomerService.execute = jest.fn();

        findCustomerQueryHandler = new FindCustomerQueryHandler(mockFindCustomerService);
    });

    it('should return an existing customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const customer = new Customer(customerId, 'John Doe', 'john@example.com', 100);
        mockFindCustomerService.execute.mockResolvedValueOnce(customer);

        const query = new FindCustomerQuery('123e4567-e89b-12d3-a456-426614174000');
        const result = await findCustomerQueryHandler.handle(query);

        expect(result).toEqual(customer);
        expect(mockFindCustomerService.execute).toHaveBeenCalledWith(customerId);
    });

    it('should throw an error if the service fails', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        mockFindCustomerService.execute.mockRejectedValueOnce(new Error('Service failed'));

        const query = new FindCustomerQuery('123e4567-e89b-12d3-a456-426614174000');

        await expect(findCustomerQueryHandler.handle(query)).rejects.toThrow('Service failed');
    });
});