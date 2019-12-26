import { createConnection } from "typeorm";
import entities from "./entities";

async function createDbConnection() {
  const connection = await createConnection({
    type: process.env.DB_DRIVER || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "enigmacamp",
    database: process.env.DB_NAME || "expressJs",
    synchronize: process.env.DB_SYNC === "true" || true,
    logging: process.env.DB_LOGGING === "true" || true,
      entities:Object.values(entities)
  });
  return connection;
}
export default createDbConnection;
