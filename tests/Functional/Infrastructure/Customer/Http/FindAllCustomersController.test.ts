import { FindAllCustomersController } from "../../../../../src/StoreContext/Infrastructure/Customer/Http/FindAllCustomersController";
import { QueryBus } from "../../../../../src/SharedContext/Infrastructure/Query/QueryBus";
import { Request, Response } from "express";

describe("FindAllCustomersController", () => {
    let queryBus: QueryBus;
    let findAllCustomersController: FindAllCustomersController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        queryBus = {
            ask: jest.fn().mockResolvedValue({
                result: [
                    { id: "1", name: "John Doe", email: "johndoe@example.com" },
                    { id: "2", name: "Jane Doe", email: "janedoe@example.com" }
                ]
            })
        } as any;

        findAllCustomersController = new FindAllCustomersController(queryBus);

        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    it("should return a list of customers", async () => {
        await findAllCustomersController.index(res as Response);

        expect(res.json).toHaveBeenCalledWith([
            { id: "1", name: "John Doe", email: "johndoe@example.com" },
            { id: "2", name: "Jane Doe", email: "janedoe@example.com" }
        ]);
    });
});