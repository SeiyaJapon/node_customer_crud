import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Application, Response } from 'express';

import { AddCreditController } from '../Customer/Http/AddCreditController';
import { CreateCustomerController } from '../Customer/Http/CreateCustomerController';
import { DeleteCustomerController } from '../Customer/Http/DeleteCustomerController';
import { FindAllCustomersController } from '../Customer/Http/FindAllCustomersController';
import { FindCustomerController } from "../Customer/Http/FindCustomerController";
import { UpdateCustomerController } from '../Customer/Http/UpdateCustomerController';

import { CommandBus } from '../../../SharedContext/Infrastructure/Command/CommandBus';
import { CommandBusInterface } from '../../../SharedContext/Infrastructure/Command/CommandBusInterface';
import { QueryBus } from '../../../SharedContext/Infrastructure/Query/QueryBus';
import { QueryBusInterface } from '../../../SharedContext/Infrastructure/Query/QueryBusInterface';


dotenv.config();
const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const commandBus: CommandBusInterface = new CommandBus();
const queryBus: QueryBusInterface = new QueryBus();

const createCustomerController: CreateCustomerController = new CreateCustomerController(commandBus, queryBus);
const findCustomerController: FindCustomerController = new FindCustomerController(queryBus);
const findAllCustomersController: FindAllCustomersController = new FindAllCustomersController(queryBus);
const updateCustomerController: UpdateCustomerController = new UpdateCustomerController(commandBus, queryBus);
const deleteCustomerController: DeleteCustomerController = new DeleteCustomerController(commandBus);
const addCreditController: AddCreditController = new AddCreditController(commandBus, queryBus);

app.post('/customers', async (req, res) => {
    try {
        const result = await createCustomerController.index(req, res);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});
app.get('/customers/:id', async (req, res) => {
    try {
        await findCustomerController.index(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});
app.get('/customers', async (res: Response) => {
    try {
        await findAllCustomersController.index(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});
app.put('/customers/:id', async (req, res) => {
    try {
        await updateCustomerController.index(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});
app.delete('/customers/:id', async (req, res) => {
    try {
        await deleteCustomerController.index(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});
app.patch('/customers/:id/credit', async (req, res) => {
    try {
        await addCreditController.index(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the request' });
    }
});

app.listen(port, () => {
    console.log(`Listening server in http://localhost:${port}`);
});

export default app;