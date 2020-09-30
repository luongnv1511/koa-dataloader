const knex = require("./knex");

const users = () => knex("users");

const findOne = (cond) => {
  return users().select().where(cond).first();
};

const save = async (values) => {
  const [id] = await users().insert(values).returning("id");
  return id;
};

module.exports = { findOne, save };
