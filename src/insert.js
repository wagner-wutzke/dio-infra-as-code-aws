"use strict";

exports.handler = async (event) => {

  const { v4: uuidv4 } = await import("uuid");
  const { default: AWS } = await import("aws-sdk");

  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const data = JSON.parse(event.body)
  const createdAt = new Date().toISOString();
  const params = {
    TableName: "ItemTable",
    Item: {
      id: uuidv4(),
      item: data.item,
      createdAt: createdAt,
      itemStatus: data.status,
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      headers: { "Content-Type": "application/json"},
      statusCode: 200,
      body: JSON.stringify(params.Item, null, 2),
    };
  } catch (error) {
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 500,
      body: JSON.stringify({error: "Could not create item"}),
    };
  }
}