require("dotenv").config();

const env = process.env;

const intValue = (value, defaultValue) => {
  return parseInt(value) || defaultValue;
};

const server = {
  port: intValue(env.PORT, 1234),
  host: env.SERVER_HOST || "localhost",
};

let protocol = server.secure ? "https" : "http";
let port = server.port == 80 || server.port == 443 ? "" : `:${server.port}`;
let serverURL = `${protocol}://${server.host}${port}`;
server.url = env.SERVER_URL || serverURL;

module.exports = {
  server,
  db: {
    client: "pg",
    connection: env.DB_CONN || "postgresql://user:pass@localhost:35432/db",
    migrations: {
      tableName: "migrations",
    },
    pool: { min: 5, max: 64 },
  },
};
