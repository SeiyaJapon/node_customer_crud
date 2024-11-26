import { FindCustomerController } from "../../../../../src/StoreContext/Infrastructure/Customer/Http/FindCustomerController";
import { QueryBus } from "../../../../../src/SharedContext/Infrastructure/Query/QueryBus";
import { FindCustomerQuery } from "../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import { CustomerNotFoundException } from "../../../../../src/StoreContext/Domain/Customer/Exception/CustomerNotFoundException";
import { Request, Response } from "express";
import { FindCustomerQueryResult } from "../../../../../src/StoreContext/Application/Customer/Queries/FindCustomer/FindCustomerQueryResult";

describe("FindCustomerController - Functional Test", () => {
    let queryBus: jest.Mocked<QueryBus>;
    let findCustomerController: FindCustomerController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        queryBus = {
            ask: jest.fn()
        } as any;

        findCustomerController = new FindCustomerController(queryBus);

        req = {
            params: { id: "123" }
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    it("should return a customer successfully", async () => {
        const customer = new FindCustomerQueryResult("123", "John Doe", "john@example.com", 100);
        queryBus.ask.mockResolvedValueOnce(customer);

        await findCustomerController.index(req as Request<{ id: string }>, res as Response);

        expect(queryBus.ask).toHaveBeenCalledWith(new FindCustomerQuery("123"));
        expect(res.json).toHaveBeenCalledWith(customer.result()[0]);
    });

    it("should return 404 if customer is not found", async () => {
        queryBus.ask.mockRejectedValueOnce(new CustomerNotFoundException("Customer not found"));

        await findCustomerController.index(req as Request<{ id: string }>, res as Response);

        expect(queryBus.ask).toHaveBeenCalledWith(new FindCustomerQuery("123"));
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Customer not found" });
    });

    it("should return 500 for internal server error", async () => {
        queryBus.ask.mockRejectedValueOnce(new Error("Internal error"));

        await findCustomerController.index(req as Request<{ id: string }>, res as Response);

        expect(queryBus.ask).toHaveBeenCalledWith(new FindCustomerQuery("123"));
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
});