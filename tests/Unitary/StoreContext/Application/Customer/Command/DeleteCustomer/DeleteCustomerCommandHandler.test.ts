import { DeleteCustomerCommandHandler } from "../../../../../../../src/StoreContext/Application/Customer/Commands/DeleteCustomer/DeleteCustomerCommandHandler";
import { DeleteCustomerService } from "../../../../../../../src/StoreContext/Domain/Customer/Service/DeleteCustomerService";
import { DeleteCustomerCommand } from "../../../../../../../src/StoreContext/Application/Customer/Commands/DeleteCustomer/DeleteCustomerCommand";
import { CustomerId } from "../../../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

jest.mock("../../../../../../../src/StoreContext/Domain/Customer/Service/DeleteCustomerService");

describe('DeleteCustomerCommandHandler', () => {
    let deleteCustomerCommandHandler: DeleteCustomerCommandHandler;
    let mockDeleteCustomerService: jest.Mocked<DeleteCustomerService>;

    beforeEach(() => {
        mockDeleteCustomerService = new DeleteCustomerService({} as any) as jest.Mocked<DeleteCustomerService>;
        mockDeleteCustomerService.deleteCustomer = jest.fn();

        deleteCustomerCommandHandler = new DeleteCustomerCommandHandler(mockDeleteCustomerService);
    });

    it('should delete an existing customer', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const command = new DeleteCustomerCommand('123e4567-e89b-12d3-a456-426614174000');

        await deleteCustomerCommandHandler.handle(command);

        expect(mockDeleteCustomerService.deleteCustomer).toHaveBeenCalledWith(customerId);
    });

    it('should throw an error if the deletion fails', async () => {
        const customerId = new CustomerId('123e4567-e89b-12d3-a456-426614174000');
        const command = new DeleteCustomerCommand('123e4567-e89b-12d3-a456-426614174000');

        mockDeleteCustomerService.deleteCustomer.mockRejectedValueOnce(new Error('Deletion failed'));

        await expect(deleteCustomerCommandHandler.handle(command)).rejects.toThrow('Deletion failed');
    });
});