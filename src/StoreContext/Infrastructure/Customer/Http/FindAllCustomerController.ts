import {QueryBusInterface} from "../../../../SharedContext/Infrastructure/Query/QueryBusInterface";
import {Response} from "express";
import {FindAllCustomersQuery} from "../../../Application/Customer/Queries/FindAllCustomers/FindAllCustomersQuery";

export class FindAllCustomerController {
    private queryBus: QueryBusInterface;

    constructor(queryBus: QueryBusInterface) {
        this.queryBus = queryBus;
    }

    async findAll(res: Response) {
        try {
            const customers = await this.queryBus.ask(new FindAllCustomersQuery());

            res.json(customers);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}