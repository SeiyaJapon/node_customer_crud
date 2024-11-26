import { AddCreditController } from "../../../../../src/StoreContext/Infrastructure/Customer/Http/AddCreditController";
import { CommandBus } from "../../../../../src/SharedContext/Infrastructure/Command/CommandBus";
import { QueryBus } from "../../../../../src/SharedContext/Infrastructure/Query/QueryBus";
import { AddCreditCommand } from "../../../../../src/StoreContext/Application/Customer/Commands/AddCredit/AddCreditCommand";
import { FindCustomerQuery } from "../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import { Request, Response } from "express";

describe("AddCreditController - Functional Test", () => {
    let controller: AddCreditController;
    let mockCommandBus: jest.Mocked<CommandBus>;
    let mockQueryBus: jest.Mocked<QueryBus>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockCommandBus = { handle: jest.fn() } as any;
        mockQueryBus = { ask: jest.fn() } as any;
        controller = new AddCreditController(mockCommandBus, mockQueryBus);

        mockRes = {
            status: jest.fn().mockReturnThis() as unknown as (code: number) => Response,
            send: jest.fn() as unknown as (body?: any) => Response
        };
    });

    it("should call commandBus and queryBus with the correct parameters", async () => {
        const customerId = "123";
        const credit = 100;

        await controller.index({ body: { customerId, credit } } as Request, mockRes as Response);

        expect(mockCommandBus.handle).toHaveBeenCalledWith(new AddCreditCommand(customerId, credit));
        expect(mockQueryBus.ask).toHaveBeenCalledWith(new FindCustomerQuery(customerId));
    });
});