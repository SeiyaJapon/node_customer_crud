import {CommandInterface} from "../../Application/Command/CommandInterface";

export interface CommandBusInterface {
    handle(command: CommandInterface): Promise<void>;
}