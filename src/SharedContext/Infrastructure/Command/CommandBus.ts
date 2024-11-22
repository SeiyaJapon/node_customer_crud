import { CommandBusInterface } from './CommandBusInterface';
import { CommandInterface } from '../../Application/Command/CommandInterface';

export class CommandBus implements CommandBusInterface {
    async handle(command: CommandInterface): Promise<void> {
        // Implementación de manejo de comandos
        console.log('Handling command:', command);
        // Aquí iría la lógica para manejar el comando
    }
}