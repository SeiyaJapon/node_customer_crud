import { UpdateCustomerCommandHandler } from "../../../../../../../src/StoreContext/Application/Customer/Commands/UpdateCustomer/UpdateCustomerCommandHandler";
import { UpdateCustomerService } from "../../../../../../../src/StoreContext/Domain/Customer/Service/UpdateCustomerService";
import { UpdateCustomerCommand } from "../../../../../../../src/StoreContext/Application/Customer/Commands/UpdateCustomer/UpdateCustomerCommand";
import { CustomerId } from "../../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";
import { Customer } from "../../../../../../../src/StoreContext/Domain/Customer/Customer";

jest.mock("../../../../../../../src/StoreContext/Domain/Customer/Service/UpdateCustomerService");

describe('UpdateCustomerCommandHandler', () => {
    let updateCustomerCommandHandler: UpdateCustomerCommandHandler;
    let mockUpdateCustomerService: jest.Mocked<UpdateCustomerService>;

    beforeEach(() => {
        mockUpdateCustomerService = new UpdateCustomerService({} as any) as jest.Mocked<UpdateCustomerService>;
        mockUpdateCustomerService.updateCustomer = jest.fn();

        updateCustomerCommandHandler = new UpdateCustomerCommandHandler(mockUpdateCustomerService);
    });

    it('should update an existing customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const command = new UpdateCustomerCommand('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'john@example.com', 150);
        const customer = new Customer(customerId, 'John Doe', 'john@example.com', 150);

        await updateCustomerCommandHandler.handle(command);

        expect(mockUpdateCustomerService.updateCustomer).toHaveBeenCalledWith(customer);
    });

    it('should throw an error if the update fails', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const command = new UpdateCustomerCommand('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'john@example.com', 150);

        mockUpdateCustomerService.updateCustomer.mockRejectedValueOnce(new Error('Update failed'));

        await expect(updateCustomerCommandHandler.handle(command)).rejects.toThrow('Update failed');
    });
});