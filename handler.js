const { ApolloServer } = require("apollo-server-lambda");
const { typeDefs } = require("./src/schema/schema");
const { resolvers } = require("./src/resolver/resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.graphqlHandler = server.createHandler();
