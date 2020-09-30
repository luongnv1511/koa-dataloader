const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./schema");
const modules = require("./modules");

const resolvers = {
  ...modules.resolvers,
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
