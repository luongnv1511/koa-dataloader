const knex = require("./knex");
const users = require("./users");
const collections = require("./collections");
const products = require("./products");

module.exports = {
  knex,
  users,
  collections,
  products,
};
