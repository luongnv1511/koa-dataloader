const knex = require("./knex");

const products = () => knex("products");

const findOne = (cond) => {
  return products().select().where(cond).first();
};

const findIDs = async (ids, { select = "*" } = {}) => {
  return await products()
    .select(select)
    .where(knex.raw(`id = ANY(?) `, [ids]));
};

const save = async (params) => {
  const [rs] = await products().insert(params).returning("*");
  return rs;
};

const update = async (id, params) => {
  const [rs] = await products()
    .where({ id })
    .update({
      shopify_data: params,
      updated_at: new Date(),
    })
    .returning("*");
  return rs;
};

module.exports = { findOne, findIDs, save, update };
