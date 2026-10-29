"use strict";

exports.handler = async (event) => {

    const { default: AWS } = await import("aws-sdk");
    const dynamoDb = new AWS.DynamoDB.DocumentClient();

    const { id } = event.pathParameters;
    const { itemStatus } = JSON.parse(event.body);

    try {
        await dynamoDb.update({ 
            TableName: "ItemTable", 
            Key: { id },
            UpdateExpression: "set itemStatus = :itemStatus",
            ExpressionAttributeValues: { ":itemStatus": itemStatus },
            ReturnValues: "ALL_NEW"
        }).promise();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ msg: "Item updated successfully" }),
        };

    } catch (error) {
        console.error("Error updating item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error updating item",
            }),
        };
    }

    

}