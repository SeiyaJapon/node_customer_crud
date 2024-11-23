import {Response} from "express";
import {CustomerNotFoundException} from "../../../Domain/Customer/Exception/CustomerNotFoundException";
import {QueryBusInterface} from "../../../../SharedContext/Infrastructure/Query/QueryBusInterface";
import {FindCustomerQuery} from "../../../Application/Customer/Queries/FindCustomer/FindCustomerQuery";

export class FindCustomerController {
    private queryBus: QueryBusInterface;

    constructor(queryBus: QueryBusInterface) {
        this.queryBus = queryBus;
    }

    async index(req: { params: { id: string } }, res: Response): Promise<void> {
        try {
            const customer = await this.queryBus.ask(new FindCustomerQuery(req.params.id));

            res.json(customer);
        } catch (error) {
            if (error instanceof CustomerNotFoundException) {
                res.status(404).json({ error: 'Customer not found' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}