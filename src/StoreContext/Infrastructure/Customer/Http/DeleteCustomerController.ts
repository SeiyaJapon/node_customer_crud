import { CommandBusInterface } from "../../../../SharedContext/Infrastructure/Command/CommandBusInterface";
import { DeleteCustomerCommand } from "../../../Application/Customer/Commands/DeleteCustomer/DeleteCustomerCommand";

export class DeleteCustomerController {
    private commandBus: CommandBusInterface;

    constructor(commandBus: CommandBusInterface) {
        this.commandBus = commandBus;
    }

    async index(req: { params: { id: string } }, res: any) {
        try {
            const { id } = req.params;

            const deleteCustomerCommand = new DeleteCustomerCommand(id);

            await this.commandBus.handle(deleteCustomerCommand);

            res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            console.error('Error deleting customer:', error);
            res.status(500).json({ error: 'Error request processing' });
        }
    }
}