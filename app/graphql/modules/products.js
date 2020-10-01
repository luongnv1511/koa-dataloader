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
    collections: (parent) => {
      const collectionLoader = new DataLoader(async (ids) => {
        const cond = knex.raw(`product_id = ANY(?)`, [ids]);
        const collects = await knex("collects")
          .select("collection_id")
          .where(cond);
        const collectonIds = collects.map((item) => item.collection_id);
        const collections = await knex("collections")
          .where(knex.raw(`id = ANY(?)`, [collectonIds]))
          .first();
        return Promise.resolve([collections]);
      });
      return collectionLoader.load(parent.id);
    },
  },
};

module.exports = {
  resolvers,
};
