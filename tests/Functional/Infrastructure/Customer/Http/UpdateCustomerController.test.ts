import { UpdateCustomerController } from "../../../../../src/StoreContext/Infrastructure/Customer/Http/UpdateCustomerController";
import { CommandBus } from "../../../../../src/SharedContext/Infrastructure/Command/CommandBus";
import { QueryBus } from "../../../../../src/SharedContext/Infrastructure/Query/QueryBus";
import { UpdateCustomerCommand } from "../../../../../src/StoreContext/Application/Customer/Commands/UpdateCustomer/UpdateCustomerCommand";
import { FindCustomerQuery } from "../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import { FindCustomerQueryResult } from "../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQueryResult";
import { Request, Response } from "express";

describe("UpdateCustomerController - Functional Test", () => {
    let commandBus: jest.Mocked<CommandBus>;
    let queryBus: jest.Mocked<QueryBus>;
    let updateCustomerController: UpdateCustomerController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        commandBus = {
            handle: jest.fn()
        } as any;

        queryBus = {
            ask: jest.fn()
        } as any;

        updateCustomerController = new UpdateCustomerController(commandBus, queryBus);

        req = {
            body: { id: "123", name: "John Doe", email: "john@example.com", availableCredit: 100 }
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    it("should update a customer successfully", async () => {
        const customer = new FindCustomerQueryResult("123", "John Doe", "john@example.com", 100);
        queryBus.ask.mockResolvedValueOnce(customer);

        const result = await updateCustomerController.index(req as Request, res as Response);

        expect(commandBus.handle).toHaveBeenCalledWith(new UpdateCustomerCommand("123", "John Doe", "john@example.com", 100));
        expect(queryBus.ask).toHaveBeenCalledWith(new FindCustomerQuery("123"));
        expect(result).toEqual(customer);
    });

    it("should handle errors when updating a customer", async () => {
        commandBus.handle.mockRejectedValueOnce(new Error("Update error"));

        await expect(updateCustomerController.index(req as Request, res as Response)).rejects.toThrow("Error request processing");

        expect(commandBus.handle).toHaveBeenCalledWith(new UpdateCustomerCommand("123", "John Doe", "john@example.com", 100));
        expect(queryBus.ask).not.toHaveBeenCalled();
    });
});