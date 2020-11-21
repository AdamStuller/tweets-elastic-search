import { Client } from "pg";

export type PgClient = typeof Client;

export type ClientOpts = {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
};

export const connectDb = async (clientOpts: ClientOpts): Promise<PgClient> => {
  const client = new Client(clientOpts);

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("connection error", error);
    process.exit(1);
  }
};
