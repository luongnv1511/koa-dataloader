const { knex } = require("../../db");

const jmDefs = {
  Query: {},
};

const resolvers = {
  Query: {
    hello: () => {
      return "hello";
    },
    users: async () => {
      return await knex("users");
    },
  },
  Mutation: {
    hi: () => {
      return "hello";
    },
  },
};

module.exports = {
  resolvers,
  jmDefs,
};
