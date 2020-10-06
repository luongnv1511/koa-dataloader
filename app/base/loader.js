const _ = require("lodash");
const Dataloader = require("dataloader");

const { knex } = require("../db");

const batchCollections = async (ids, { Suggestion }) => {
  const cond = knex.raw(`product_id = ANY(?)`, [ids]);
  const collects = await knex("collects")
    .select("collection_id")
    .where(cond);
  const collectonIds = collects.map((item) => item.collection_id);
  const collections = await knex("collections").where(knex.raw(`id = ANY(?)`, [collectonIds]));
  return [collections];
};

const loaders = () => ({
  collectionLoader: new Dataloader((ids) => batchCollections(ids, knex)),
});

module.exports = { loaders };
