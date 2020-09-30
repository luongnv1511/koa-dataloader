const { connectionFromArray } = require("graphql-relay");

const { knex } = require("../../db");

const jmDefs = {
  Query: {},
};

const resolvers = {
  Query: {
    hello: () => {
      return "hello";
    },
    users: async (info, args) => {
      const { first = null, after = 0 } = args;
      let query = await knex("users").offset(after);
      if (first) {
        query.limit(first);
      }
      const users = await query;
      return connectionFromArray(users, args);
    },
  },
  Mutation: {
    hi: () => {
      return "hello";
    },
  },
  User: {
    name: (parent) => {
      return parent.name;
    },
  },
};

module.exports = {
  resolvers,
  jmDefs,
};
