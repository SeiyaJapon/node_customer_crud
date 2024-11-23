import express, { Application, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import { GetCustomerByIdController } from '../Customer/Http/GetCustomerByIdController';
// import { UpdateCustomerController } from '../Customer/Http/UpdateCustomerController';
// import { DeleteCustomerController } from '../Customer/Http/DeleteCustomerController';
// import { AddCreditController } from '../Customer/Http/AddCreditController';
import {CreateCustomerService} from "../../Domain/Customer/Service/CreateCustomerService";
import {CustomerDynamoDbRepository} from "../Customer/Persistence/CustomerDynamoDbRepository";
import {CustomerRepositoryInterface} from "../../Domain/Customer/Repositories/CustomerRepositoryInterface";
import {FindCustomerService} from "../../Domain/Customer/Service/FindCustomerService";
import { CommandBusInterface } from '../../../SharedContext/Infrastructure/Command/CommandBusInterface';
import { QueryBusInterface } from '../../../SharedContext/Infrastructure/Query/QueryBusInterface';
import { CommandBus } from '../../../SharedContext/Infrastructure/Command/CommandBus';
import { QueryBus } from '../../../SharedContext/Infrastructure/Query/QueryBus';
import { CreateCustomerController } from '../Customer/Http/CreateCustomerController';
import { FindCustomerController } from "../Customer/Http/FindCustomerController";
import {FindAllCustomerService} from "../../Domain/Customer/Service/FindAllCustomerService";
import {FindAllCustomersController} from "../Customer/Http/FindAllCustomersController";
import {UpdateCustomerService} from "../../Domain/Customer/Service/UpdateCustomerService";
import {DeleteCustomerService} from "../../Domain/Customer/Service/DeleteCustomerService";
import {UpdateCustomerController} from "../Customer/Http/UpdateCustomerController";
import {DeleteCustomerController} from "../Customer/Http/DeleteCustomerController";

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const customerRepository: CustomerRepositoryInterface = new CustomerDynamoDbRepository();

const createCustomerService:CreateCustomerService = new CreateCustomerService(customerRepository);
const findCustomerService:FindCustomerService = new FindCustomerService(customerRepository);
const findAllCustomersService:FindAllCustomerService = new FindAllCustomerService(customerRepository);
const updateCustomerService = new UpdateCustomerService(customerRepository);
const deleteCustomerService = new DeleteCustomerService(customerRepository);

const commandBus: CommandBusInterface = new CommandBus();
const queryBus: QueryBusInterface = new QueryBus();

const createCustomerController: CreateCustomerController = new CreateCustomerController(commandBus, queryBus);
const findCustomerController: FindCustomerController = new FindCustomerController(queryBus);
const findAllCustomersController: FindAllCustomersController = new FindAllCustomersController(queryBus);
const updateCustomerController: UpdateCustomerController = new UpdateCustomerController(commandBus, queryBus);
const deleteCustomerController: DeleteCustomerController = new DeleteCustomerController(commandBus);

// const addCreditController = new AddCreditController(customerService);

app.post('/customers', async (req, res) => {
    try {
        const result = await createCustomerController.index(req, res);
        res.json(result);  // Enviar el resultado al cliente
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});
app.get('/customers/:id', async (req, res) => {
    try {
        await findCustomerController.index(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});
app.get('/customers', async (res: Response) => {
    try {
        await findAllCustomersController.index(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});
app.put('/customers/:id', async (req, res) => {
    try {
        await updateCustomerController.index(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});
app.delete('/customers/:id', async (req, res) => {
    try {
        await deleteCustomerController.index(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// app.patch('/customers/:id/credit', (req, res) => addCreditController.addCredit(req, res));

app.listen(port, () => {
    console.log(`Listening server in http://localhost:${port}`);
});

export default app;