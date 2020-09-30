const _ = require("lodash");

const modules = [require("./users")];

const mergeAll = (items) => _.reduce(items, _.merge);
const resolvers = mergeAll(modules.map((m) => m.resolvers));
const jmDefs = mergeAll(modules.map((m) => m.jmDefs));

module.exports = {
  resolvers,
  jmDefs,
};
