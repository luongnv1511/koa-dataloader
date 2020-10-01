const resolvers = {
  Query: {},
  Mutation: {},
  Node: {
    __resolveType(node) {
      return node.__type__.name;
    },
  },
};

module.exports = {
  resolvers,
};
