const jmDefs = {
  Query: {},
};

const resolvers = {
  Query: {
    hello: () => {
      return "hello";
    },
  },
  Mutation: {},
};

module.exports = {
  resolvers,
  jmDefs,
};
