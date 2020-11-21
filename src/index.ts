#!/usr/bin/env node
import * as ndjson from "ndjson";
import { mapTweet, postgresStreamPromise } from "./streams";
import { simpleQuery } from "./db/queries";

import { Client } from "@elastic/elasticsearch";
import { Tweet } from "./types";
const client = new Client({ node: "http://localhost:9200" });

const migrateToElastic = async () => {
  const dataStream = await postgresStreamPromise(simpleQuery);

  const sourceStream = dataStream.pipe(mapTweet).pipe(ndjson.stringify());

  try {
    const result = await client.helpers.bulk({
      datasource: sourceStream,
      onDocument(doc: Tweet) {
        return {
          index: { _index: "tweets", _id: doc.id },
        };
      },
      onDrop(doc) {
        console.error(doc);
      },
      concurrency: 1,
    });

    console.log(result);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};

migrateToElastic();
