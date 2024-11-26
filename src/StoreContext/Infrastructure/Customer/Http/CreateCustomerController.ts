import {CommandBusInterface} from "../../../../SharedContext/Infrastructure/Command/CommandBusInterface";
import {CustomerId} from "../../../Domain/Customer/ValueObjects/CustomerId";
import {CreateCustomerCommand} from "../../../Application/Customer/Commands/CreateCustomer/CreateCustomerCommand";
import {FindCustomerQuery} from "../../../Application/Customer/Queries/FindCustomer/FindCustomerQuery";
import {QueryBusInterface} from "../../../../SharedContext/Infrastructure/Query/QueryBusInterface";

export class CreateCustomerController {
    private commandBus: CommandBusInterface;
    private queryBus: QueryBusInterface;

    constructor(commandBus: CommandBusInterface, queryBus: QueryBusInterface) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    async index(req: { body: { id: string | null, name: string, email: string, availableCredit: number } }, res: any) {
        try {
            let customerId = req.body.id;
            if (!customerId) {
                customerId = CustomerId.generate().value;
            }

            const createCustomerCommand = new CreateCustomerCommand(
                customerId,
                req.body.name,
                req.body.email,
                req.body.availableCredit
            );

            await this.commandBus.handle(createCustomerCommand);

            const findCustomerQuery = new FindCustomerQuery(customerId);

            return await this.queryBus.ask(findCustomerQuery);

        } catch (error) {
            throw new Error('Error request processing');
        }
    }
}