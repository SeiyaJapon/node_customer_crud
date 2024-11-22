import { DynamoDB } from 'aws-sdk';
import {Customer} from "../../../Domain/Customer/Customer";
import {CustomerId} from "../../../Domain/Customer/ValueObjects/CustomerId";
import {CustomerRepositoryInterface} from "../../../Domain/Customer/Repositories/CustomerRepositoryInterface";

export class CustomerDynamoDbRepository implements CustomerRepositoryInterface {
    private dynamoDb: DynamoDB.DocumentClient;
    private tableName: string;

    constructor() {
        this.dynamoDb = new DynamoDB.DocumentClient();
        this.tableName = process.env.CUSTOMERS_TABLE || 'Customers';
    }

    async find(id: CustomerId): Promise<Customer | null> {
        const params = {
            TableName: this.tableName,
            Key: { id: id.value },
        };

        const result = await this.dynamoDb.get(params).promise();

        if (!result.Item) return null;

        return new Customer(
            new CustomerId(result.Item.id),
            result.Item.name,
            result.Item.email,
            result.Item.availableCredit
        );
    }

    async findAll(): Promise<Customer[]> {
        const params = {
            TableName: this.tableName,
        };

        const result = await this.dynamoDb.scan(params).promise();
        return result.Items ? result.Items.map(item => new Customer(
            new CustomerId(item.id),
            item.name,
            item.email,
            item.availableCredit
        )) : [];
    }

    async save(customer: Customer): Promise<Customer> {
        const params = {
            TableName: this.tableName,
            Item: {
                id: customer.id.value,
                name: customer.name,
                email: customer.email,
                availableCredit: customer.availableCredit
            },
        };

        await this.dynamoDb.put(params).promise();
        return customer;
    }

    async update(customer: Customer): Promise<Customer> {
        const params = {
            TableName: this.tableName,
            Key: { id: customer.id.value },
            UpdateExpression: 'set #name = :name, email = :email, availableCredit = :credit',
            ExpressionAttributeNames: { '#name': 'name' },
            ExpressionAttributeValues: {
                ':name': customer.name,
                ':email': customer.email,
                ':credit': customer.availableCredit,
            },
            ReturnValues: 'ALL_NEW',
        };

        const result = await this.dynamoDb.update(params).promise();
        return new Customer(
            new CustomerId(result.Attributes.id),
            result.Attributes.name,
            result.Attributes.email,
            result.Attributes.availableCredit
        );
    }

    async delete(id: CustomerId): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { id: id.value },
        };

        await this.dynamoDb.delete(params).promise();
    }
}
