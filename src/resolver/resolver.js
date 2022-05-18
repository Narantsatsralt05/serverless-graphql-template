const ShortUniqueId = require("short-unique-id");
const client = require("../db");
const { getTodos, updateTodo } = require("../utils");

export const resolvers = {
  Query: {
    hello: () => "Greetings from Naraa :))",
    getTodoList: () => getTodos(),
    getTodo: async (_, { id }) => {
      const params = {
        TableName: "todos",
        Key: { id },
      };
      try {
        const { Item } = await client.get(params).promise();
        return { ...Item };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createTodo: async (_, { input }) => {
      const uid = new ShortUniqueId();
      const todoId = uid.randomUUID(8);
      const params = {
        TableName: "todos",
        Item: {
          id: todoId,
          ...input,
        },
      };
      try {
        await client.put(params).promise();
        return params.Item;
      } catch (err) {
        throw new Error(err);
      }
    },
    updateTodo,
    deleteTodo: async (_, { id }) => {
      try {
        const params = {
          TableName: "todos",
          Key: { id },
        };
        await client.delete(params).promise();
        return "Successfully deleted";
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
