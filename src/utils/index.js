const client = require("../db");

const updateTodo = async (_, { input }) => {
  const { id } = input;
  let updateExpression, expressionAttributesValues;
  if (!input.description && !input.completed)
    throw new Error("Either a description or a completetd is required");

  if (!input.description) {
    updateExpression = "set completed = :c";
    expressionAttributesValues = {
      ":c": input.completed,
    };
  }

  if (!input.completed) {
    updateExpression = "set description = :d";
    expressionAttributesValues = {
      ":d": input.description,
    };
  }
  const params = {
    TableName: "todos",
    Key: { id },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributesValues,
  };
  try {
    await client.update(params).promise();
    return input;
  } catch (err) {
    throw new Error(err);
  }
};

const getTodos = async () => {
  const params = {
    TableName: "todos",
    Limit: 50,
    Select: "ALL_ATTRIBUTES",
  };

  try {
    const { Items } = await client.scan(params).promise();
    const quotes = [];
    Items.forEach((item) => {
      quotes.push(item);
    });
    return quotes;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getTodos, updateTodo };
