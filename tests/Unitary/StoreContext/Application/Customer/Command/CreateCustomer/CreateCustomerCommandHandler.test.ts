import {
    CreateCustomerCommandHandler
} from "../../../../../../../src/StoreContext/Application/Customer/Commands/CreateCustomer/CreateCustomerCommandHandler";
import {
    CreateCustomerService
} from "../../../../../../../src/StoreContext/Domain/Customer/Service/CreateCustomerService";
import { CustomerId } from "../../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";
import {
    CreateCustomerCommand
} from "../../../../../../../src/StoreContext/Application/Customer/Commands/CreateCustomer/CreateCustomerCommand";
import {
    CustomerRepositoryInterface
} from "../../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";
import { FindCustomerService } from "../../../../../../../src/StoreContext/Domain/Customer/Service/FindCustomerService";

jest.mock("../../../../../../../src/StoreContext/Domain/Customer/Service/CreateCustomerService");
jest.mock("../../../../../../../src/StoreContext/Domain/Customer/Service/FindCustomerService");

describe('CreateCustomerCommandHandler', () => {
    let createCustomerCommandHandler: CreateCustomerCommandHandler;
    let mockCreateCustomerService: jest.Mocked<CreateCustomerService>;
    let mockFindCustomerService: jest.Mocked<FindCustomerService>;
    let mockCustomerRepository: jest.Mocked<CustomerRepositoryInterface>;

    beforeEach(() => {
        mockCustomerRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as jest.Mocked<CustomerRepositoryInterface>;

        mockFindCustomerService = new FindCustomerService(mockCustomerRepository) as jest.Mocked<FindCustomerService>;

        mockCreateCustomerService = new CreateCustomerService(mockCustomerRepository, mockFindCustomerService) as jest.Mocked<CreateCustomerService>;
        mockCreateCustomerService.execute = jest.fn();
        createCustomerCommandHandler = new CreateCustomerCommandHandler(mockCreateCustomerService);
    });

    it('should create a new customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const command = new CreateCustomerCommand('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'john@example.com', 100);

        await createCustomerCommandHandler.handle(command);

        expect(mockCreateCustomerService.execute).toHaveBeenCalledWith(customerId, 'John Doe', 'john@example.com', 100);
    });

    it('should throw an error if the creation fails', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const command = new CreateCustomerCommand('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'john@example.com', 100);

        mockCreateCustomerService.execute.mockRejectedValueOnce(new Error('Creation failed'));

        await expect(createCustomerCommandHandler.handle(command)).rejects.toThrow('Creation failed');
    });
});