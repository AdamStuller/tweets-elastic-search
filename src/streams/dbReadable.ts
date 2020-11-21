import { PgClient } from "../db";
import { initDatabaseReadable } from "../util/readable";

const { connectDb } = require("../db");

const connection: Promise<PgClient> = connectDb({
  host: "localhost",
  port: "5432",
  user: "root",
  password: "qwerty",
  database: "tweets",
});

export const postgresStreamPromise = initDatabaseReadable(connection)