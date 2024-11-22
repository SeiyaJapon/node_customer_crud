import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { CreateCustomerController } from '../Customer/Http/CreateCustomerController';
// import { ListCustomersController } from '../Customer/Http/ListCustomersController';
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

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const customerRepository: CustomerRepositoryInterface = new CustomerDynamoDbRepository();

const createCustomerService:CreateCustomerService = new CreateCustomerService(customerRepository);
const findCustomerService:FindCustomerService = new FindCustomerService(customerRepository);

const commandBus: CommandBusInterface = new CommandBus();
const queryBus: QueryBusInterface = new QueryBus();

const createCustomerController: CreateCustomerController = new CreateCustomerController(commandBus, queryBus);

// const listCustomersController = new ListCustomersController(customerService);
// const getCustomerByIdController = new GetCustomerByIdController(customerService);
// const updateCustomerController = new UpdateCustomerController(customerService);
// const deleteCustomerController = new DeleteCustomerController(customerService);
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
// app.get('/customers', (req, res) => listCustomersController.listCustomers(req, res));
// app.get('/customers/:id', (req, res) => getCustomerByIdController.getCustomerById(req, res));
// app.put('/customers/:id', (req, res) => updateCustomerController.updateCustomer(req, res));
// app.delete('/customers/:id', (req, res) => deleteCustomerController.deleteCustomer(req, res));
// app.patch('/customers/:id/credit', (req, res) => addCreditController.addCredit(req, res));

app.listen(port, () => {
    console.log(`Listening server in http://localhost:${port}`);
});

export default app;