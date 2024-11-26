import { CreateCustomerController } from "../../../../../src/StoreContext/Infrastructure/Customer/Http/CreateCustomerController";
import { CommandBus } from "../../../../../src/SharedContext/Infrastructure/Command/CommandBus";
import { QueryBus } from "../../../../../src/SharedContext/Infrastructure/Query/QueryBus";
import { CreateCustomerCommand } from "../../../../../src/StoreContext/Application/Customer/Commands/CreateCustomer/CreateCustomerCommand";
import { FindCustomerQuery } from "../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import { Request, Response } from "express";
import { CustomerId } from "../../../../../src/StoreContext/Domain/Customer/ValueObjects/CustomerId";

describe("CreateCustomerController - Functional Test", () => {
    let controller: CreateCustomerController;
    let mockCommandBus: jest.Mocked<CommandBus>;
    let mockQueryBus: jest.Mocked<QueryBus>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockCommandBus = { handle: jest.fn() } as any;
        mockQueryBus = { ask: jest.fn() } as any;
        controller = new CreateCustomerController(mockCommandBus, mockQueryBus);

        mockRes = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            send: jest.fn() as unknown as (body?: any) => Response
        };
    });

    it("should call commandBus and queryBus with the correct parameters when customerId is provided", async () => {
        const customerId = "123";
        const name = "John Doe";
        const email = "john.doe@example.com";
        const availableCredit = 500;

        await controller.index(
            { body: { id: customerId, name, email, availableCredit } } as Request,
            mockRes as Response
        );

        expect(mockCommandBus.handle).toHaveBeenCalledWith(new CreateCustomerCommand(customerId, name, email, availableCredit));
        expect(mockQueryBus.ask).toHaveBeenCalledWith(new FindCustomerQuery(customerId));
    });

    it("should generate a customerId if none is provided", async () => {
        const name = "John Doe";
        const email = "john.doe@example.com";
        const availableCredit = 500;

        jest.spyOn(CustomerId, 'generate').mockReturnValue({ value: "generated-id" } as CustomerId);

        await controller.index(
            { body: { id: null, name, email, availableCredit } } as Request,
            mockRes as Response
        );

        expect(mockCommandBus.handle).toHaveBeenCalledWith(new CreateCustomerCommand("generated-id", name, email, availableCredit));
        expect(mockQueryBus.ask).toHaveBeenCalledWith(new FindCustomerQuery("generated-id"));
    });

    it("should handle errors and return an error response", async () => {
        const name = "John Doe";
        const email = "john.doe@example.com";
        const availableCredit = 500;

        const originalConsoleError = console.error;
        console.error = jest.fn();

        mockCommandBus.handle.mockRejectedValue(new Error("Error handling command"));

        await expect(
            controller.index(
                { body: { id: null, name, email, availableCredit } } as Request,
                mockRes as Response
            )
        ).rejects.toThrow("Error request processing");

        console.error = originalConsoleError;

        expect(mockCommandBus.handle).toHaveBeenCalled();
        expect(mockQueryBus.ask).not.toHaveBeenCalled();
    });

});
