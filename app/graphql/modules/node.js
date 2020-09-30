const jmDefs = {
  Query: {},
};

const resolvers = {
  Node: {
    __resolveType(node) {
      return node.__type__.name;
    },
  },
  Query: {},
  Mutation: {},
};

module.exports = {
  resolvers,
  jmDefs,
};
