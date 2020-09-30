const mount = require("koa-mount");
const Koa = require("koa");
const koaPlayground = require("graphql-playground-middleware-koa").default;

const { graphqlUploadKoa } = require("graphql-upload");
const graphqlHTTP = require("koa-graphql");
const schema = require("../graphql");

const createGraphqlApp = (schema) => {
  const app = new Koa();
  app.use(
    graphqlHTTP({
      schema,
      graphiql: false,
    })
  );
  return app;
};

module.exports = {
  attach(router, app) {
    app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 10 }));
    app.use(mount("/graphql", createGraphqlApp(schema)));

    router.all(
      "/playground",
      koaPlayground({
        endpoint: "/graphql",
      })
    );
  },
};
