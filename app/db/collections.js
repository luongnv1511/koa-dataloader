const knex = require("./knex");

const collections = knex("collections");

const findOne = (cond) => {
  return collections().select().where(cond).first();
};

const save = async (params) => {
  await collections().insert(params);
};

const update = async (id, params) => {
  await collections().where({ id }).update({
    shopify_data: params,
    updated_at: new Date(),
  });
};

module.exports = { findOne, save, update };
