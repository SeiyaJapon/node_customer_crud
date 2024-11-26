import { Response, Request } from "express";
import { CustomerNotFoundException } from "../../../Domain/Customer/Exception/CustomerNotFoundException";
import { QueryBusInterface } from "../../../../SharedContext/Infrastructure/Query/QueryBusInterface";
import { FindCustomerQuery } from "../../../Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import { FindCustomerQueryResult } from "../../../Application/Customer/Queries/FindCustomer/FindCustomerQueryResult";
import {QueryResultInterface} from "../../../../SharedContext/Application/Query/QueryResultInterface";

export class FindCustomerController {
    private queryBus: QueryBusInterface;

    constructor(queryBus: QueryBusInterface) {
        this.queryBus = queryBus;
    }

    async index(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const customer: QueryResultInterface = await this.queryBus.ask(new FindCustomerQuery(req.params.id));

            res.json(customer.result()[0]);
        } catch (error) {
            if (error instanceof CustomerNotFoundException) {
                res.status(404).json({ error: 'Customer not found' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}