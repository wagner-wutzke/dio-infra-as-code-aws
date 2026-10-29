"use strict";

exports.handler = async (event) => {

    const { default: AWS } = await import("aws-sdk");
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;

    try {
        const result = await dynamoDb.get({ TableName: "ItemTable", Key: { id } }).promise();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.Item, null, 2) 
        };

    } catch (error) {
        console.error("Error fetching item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error fetching item",
            }),
        };
    }
}