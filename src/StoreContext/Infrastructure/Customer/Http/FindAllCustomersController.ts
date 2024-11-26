import { QueryBusInterface } from "../../../../SharedContext/Infrastructure/Query/QueryBusInterface";
import { Response } from "express";
import { FindAllCustomersQuery } from "../../../Application/Customer/Queries/FindAllCustomers/FindAllCustomersQuery";

export class FindAllCustomersController {
    private queryBus: QueryBusInterface;

    constructor(queryBus: QueryBusInterface) {
        this.queryBus = queryBus;
    }

    async index(res: Response) {
        try {
            const { result: customers } = await this.queryBus.ask(new FindAllCustomersQuery());
            res.json(customers);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}