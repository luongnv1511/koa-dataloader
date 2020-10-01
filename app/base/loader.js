const Dataloader = require("dataloader");

const { knex } = require("../db");

const loaders = () => ({
  getCollectionsByProductId: new Dataloader(async (id) => {
    const cond = knex.raw(`product_id = ANY(?)`, [id]);
    const collects = await knex("collects")
      .select("collection_id")
      .where(cond);
    const collectonIds = collects.map((item) => item.collection_id);
    const collection = await knex("collections")
      .where(knex.raw(`id = ANY(?)`, [collectonIds]))
      .first();
    return [collection];
  }),
});

module.exports = { loaders };
