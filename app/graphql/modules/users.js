const jmDefs = {
  Query: {},
};

const resolvers = {
  Query: {
    hello: () => {
      return "hello";
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
