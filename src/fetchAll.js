"use strict";

exports.handler = async (event) => {

  const { default: AWS } = await import("aws-sdk");
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  try {
    const results = await dynamoDb.scan({ TableName: "ItemTable" }).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(results.Items, null, 2) 
    };

  } catch (error) {
    console.error("Error fetching items:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error fetching items",
      }),
    };
  }
}