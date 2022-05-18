import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  type ToDo {
    id: ID
    description: String!
    completed: Boolean
  }

  input ToDoCreateInput {
    description: String!
    completed: Boolean
  }

  input ToDoUpdateInput {
    id: ID!
    description: String
    completed: Boolean
  }

  type Mutation {
    createTodo(input: ToDoCreateInput): ToDo
    updateTodo(input: ToDoUpdateInput): ToDo
    deleteTodo(id: ID!): String
  }

  type Query {
    hello: String
    getTodoList: [ToDo!]
    getTodo(id: ID): ToDo
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
