import {CommandBusInterface} from "../../../../SharedContext/Infrastructure/Command/CommandBusInterface";
import {UpdateCustomerCommand} from "../../../Application/Customer/Commands/UpdateCustomer/UpdateCustomerCommand";
import {FindCustomerQuery} from "../../../Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import {QueryBusInterface} from "../../../../SharedContext/Infrastructure/Query/QueryBusInterface";

export class UpdateCustomerController {
    private commandBus: CommandBusInterface;
    private queryBus: QueryBusInterface;

    constructor(commandBus: CommandBusInterface, queryBus: QueryBusInterface) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    async index(req: { body: { id: string, name: string, email: string, availableCredit: number } }, res: any) {
        try {
            const { id, name, email, availableCredit } = req.body;

            const updateCustomerCommand = new UpdateCustomerCommand(
                id,
                name,
                email,
                availableCredit
            );

            await this.commandBus.handle(updateCustomerCommand);

            const findCustomerQuery = new FindCustomerQuery(id);

            return await this.queryBus.ask(findCustomerQuery);

        } catch (error) {
            throw new Error('Error request processing');
        }
    }
}