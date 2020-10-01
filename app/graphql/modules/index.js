const _ = require("lodash");

const modules = [require("./node"), require("./users"), require("./products")];

const mergeAll = (items) => _.reduce(items, _.merge);
const resolvers = mergeAll(modules.map((m) => m.resolvers));

module.exports = {
  resolvers,
};
