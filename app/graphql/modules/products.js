const { connectionFromArray } = require("graphql-relay");
const DataLoader = require("dataloader");

const { knex } = require("../../db");

const resolvers = {
  Query: {
    product: async (info, { id }) => {
      return await knex("products")
        .select()
        .where({ id })
        .first();
    },
    products: async (info, args) => {
      const { first = null, after = 0 } = args;
      let query = knex("products")
        .offset(after)
        .where({ shop: "polynesianworld" });
      if (first) {
        query.limit(first);
      }
      const products = await query;
      return connectionFromArray(products, args);
    },
  },
  Mutation: {},
  Product: {
    collection: async (parent, info, ctx) => {
      return await ctx().loaders.getCollectionsByProductId.load(parent.id);
    },
  },
};

module.exports = {
  resolvers,
};
