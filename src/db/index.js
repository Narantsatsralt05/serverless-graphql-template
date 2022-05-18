const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
  endpoint: process.env.DYNAMODB_HOST,
  accessKeyId: process.env.KEY_ID, // needed if you don't have aws credentials at all in env
  secretAccessKey: process.env.ACCESS_KEY, // needed if you don't have aws credentials at all in env
});

module.exports = client;
