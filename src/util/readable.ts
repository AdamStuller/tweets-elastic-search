import { PgClient } from "../db";

const QueryStream = require("pg-query-stream");

export const initDatabaseReadable = (connection: PgClient) => (
  queryString: string
) => {
  return connection
    .then((client) => {
      const query = new QueryStream(queryString);
      const stream = client.query(query);
      return stream;
    })
    .catch((error) => error);
};
