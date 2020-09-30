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
