const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const CUSTOMER_TABLE = process.env.CUSTOMER_TABLE;

module.exports.main = async (event) => {
  const httpMethod = event.httpMethod;

  if (httpMethod === 'POST') {
    return createCustomer(event);
  } else if (httpMethod === 'GET') {
    return getCustomer(event);
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};

const createCustomer = async (event) => {
  const data = JSON.parse(event.body);

  if (!data.name || !data.email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Customer name and email are required' }),
    };
  }

  const customer = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    availableCredit: data.availableCredit || 0,
  };

  await dynamoDb.put({
    TableName: CUSTOMER_TABLE,
    Item: customer,
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(customer),
  };
};

const getCustomer = async (event) => {
  const { id } = event.pathParameters;

  const result = await dynamoDb.get({
    TableName: CUSTOMER_TABLE,
    Key: { id },
  }).promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Customer not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};
