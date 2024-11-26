import { Request, Response } from "express";
import {CommandBus} from "../../../../SharedContext/Infrastructure/Command/CommandBus";
import {QueryBus} from "../../../../SharedContext/Infrastructure/Query/QueryBus";
import {AddCreditCommand} from "../../../Application/Customer/Commands/AddCredit/AddCreditCommand";
import {FindCustomerQuery} from "../../../Application/Customer/Queries/FindCustomer/FindCustomerQuery";

export class AddCreditController {
    private commandBus: CommandBus;
    private queryBus: QueryBus;

    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    async index(req: Request, res: Response): Promise<void> {
        const { customerId, credit } = req.body;

        if (!customerId || !credit || 0 > credit) {
            res.status(400).send({ error: "Invalid request parameters" });
            return;
        }

        try {
            await this.commandBus.handle(
                new AddCreditCommand(customerId, credit)
            );

            const customer = await this.queryBus.ask(
                new FindCustomerQuery(customerId)
            );

            res.status(200).send({ message: "Credit added successfully", customer });
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}