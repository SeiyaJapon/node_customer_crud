import { DeleteCustomerController } from "../../../../../src/StoreContext/Infrastructure/Customer/Http/DeleteCustomerController";
import { CommandBus } from "../../../../../src/SharedContext/Infrastructure/Command/CommandBus";
import { DeleteCustomerCommand } from "../../../../../src/StoreContext/Application/Customer/Commands/DeleteCustomer/DeleteCustomerCommand";
import { Request, Response } from "express";

describe("DeleteCustomerController - Functional Test", () => {
    let controller: DeleteCustomerController;
    let mockCommandBus: jest.Mocked<CommandBus>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockCommandBus = { handle: jest.fn() } as any;
        controller = new DeleteCustomerController(mockCommandBus);

        mockRes = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            json: jest.fn().mockReturnThis() as unknown as (body?: any) => Response,
        };
    });

    it("should call commandBus with the correct parameters and return success response", async () => {
        const customerId = "123";

        const mockReq = {
            params: { id: customerId }
        } as Request<{ id: string }>;

        await controller.index(mockReq, mockRes as Response);

        expect(mockCommandBus.handle).toHaveBeenCalledWith(new DeleteCustomerCommand(customerId));
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Customer deleted successfully' });
    });

    it("should handle errors and return an error response", async () => {
        const customerId = "123";

        const originalConsoleError = console.error;
        console.error = jest.fn();

        mockCommandBus.handle.mockRejectedValue(new Error("Error handling command"));

        const mockReq = {
            params: { id: customerId }
        } as Request<{ id: string }>;

        await controller.index(mockReq, mockRes as Response);

        console.error = originalConsoleError;

        expect(mockCommandBus.handle).toHaveBeenCalledWith(new DeleteCustomerCommand(customerId));
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Error request processing' });
    });
});
