import {
    AddCreditCommandHandler
} from "../../../../../../../src/StoreContext/Application/Customer/Commands/AddCredit/AddCreditCommandHandler";
import {AddCreditService} from "../../../../../../../src/StoreContext/Domain/Customer/Service/AddCreditService";
import {FindCustomerService} from "../../../../../../../src/StoreContext/Domain/Customer/Service/FindCustomerService";
import {
    AddCreditCommand
} from "../../../../../../../src/StoreContext/Application/Customer/Commands/AddCredit/AddCreditCommand";
import {CustomerId} from "../../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";
import { Customer } from "../../../../../../../src/StoreContext/Domain/Customer/Customer";
import {
    CustomerRepositoryInterface
} from "../../../../../../../src/StoreContext/Domain/Customer/Repositories/CustomerRepositoryInterface";

describe('AddCreditCommandHandler', () => {
    let addCreditCommandHandler: AddCreditCommandHandler;
    let addCreditService: jest.Mocked<AddCreditService>;
    let findCustomerService: jest.Mocked<FindCustomerService>;
    let customerRepository: jest.Mocked<CustomerRepositoryInterface>;
    let customer: Customer;

    beforeEach(() => {
        customerRepository = {
            find: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as jest.Mocked<CustomerRepositoryInterface>;

        addCreditService = new AddCreditService(customerRepository) as jest.Mocked<AddCreditService>;
        addCreditService.execute = jest.fn();

        findCustomerService = new FindCustomerService(customerRepository) as jest.Mocked<FindCustomerService>;
        findCustomerService.execute = jest.fn();

        addCreditCommandHandler = new AddCreditCommandHandler(addCreditService, findCustomerService);

        customer = new Customer(
            new CustomerId('1234'),
            'John Doe', // nombre del cliente
            'john.doe@example.com', // correo del cliente
            100 // saldo inicial
        );
    });

    it('should call AddCreditService with the correct customer and credit', async () => {
        findCustomerService.execute.mockResolvedValue(customer);

        const command = new AddCreditCommand('1234', 50);

        await addCreditCommandHandler.handle(command);

        expect(findCustomerService.execute).toHaveBeenCalledWith(new CustomerId('1234'));
        expect(addCreditService.execute).toHaveBeenCalledWith(new CustomerId('1234'), 50);
    });

    it('should throw an error if the customer is not found', async () => {
        findCustomerService.execute.mockResolvedValue(null);

        const command = new AddCreditCommand('1234', 50);

        await expect(addCreditCommandHandler.handle(command)).rejects.toThrow('Customer not found');

        expect(findCustomerService.execute).toHaveBeenCalledWith(new CustomerId('1234'));
        expect(addCreditService.execute).not.toHaveBeenCalled();
    });
});