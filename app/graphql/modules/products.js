const DataLoader = require("dataloader");

const { knex } = require("../../db");

const jmDefs = {
  Query: {},
};

const resolvers = {
  Query: {
    product: async (info, { id }) => {
      return await knex("products").select().where({ id }).first();
    },
    products: async () => {
      return await knex("products");
    },
  },
  Mutation: {},
  Product: {
    collections: (parent) => {
      const collectionLoader = new DataLoader(async (ids) => {
        const collectons = await knex("collections")
          .join("collects", "collects.collection_id", "=", "collections.id")
          .joinRaw(
            `inner join "products" on "products".id = ANY(?) AND "collects".product_id = "products".id`,
            [ids]
          );
        return Promise.resolve(collectons);
      });
      return collectionLoader.load(parent.id);
    },
  },
};

module.exports = {
  resolvers,
  jmDefs,
};
