#!/usr/bin/env node
const ndjson = require("ndjson");
const { map, filter } = require("./util/transforms");
const { initDatabaseReadable } = require("./util/readable");

const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
const { connectDb } = require("./db");

const connection = connectDb({
  host: "localhost",
  port: "5432",
  user: "root",
  password: "qwerty",
  database: "tweets",
});

const updateTweet = ({ country, ...rest }) => ({
  ...rest,
  country: {
    name: country == null ? null : country.name,
    code: country == null ? null : country.code,
  },
});

const queryString = `
WITH t_h AS (SELECT t.id AS tweet_id, array_agg(h.value) AS tags
             FROM tweets t
                      JOIN tweet_hashtags th on t.id = th.tweet_id
                      JOIN hashtags h on th.hashtag_id = h.id
             GROUP BY t.id),
     t_m_a AS (
         SELECT t.id as tweet_id, array_agg(row_to_json(a)) AS tweet_mentions
         FROM tweets t
                  JOIN tweet_mentions tm on t.id = tm.tweet_id
                  JOIN accounts a on tm.account_id = a.id
         GROUP BY t.id
     )
SELECT   t.id AS id,
      content,
      location,
      retweet_count,
      favorite_count,
      happened_at,
      row_to_json(a.*) AS author,
      row_to_json(c.*) AS country,
      t_h.tags         AS tags,
      t_m_a.tweet_mentions
FROM tweets t
      LEFT JOIN countries c ON t.country_id = c.id
      LEFT JOIN accounts a ON t.author_id = a.id
      LEFT JOIN t_h ON t_h.tweet_id = t.id
      LEFT JOIN t_m_a ON t_m_a.tweet_id = t.id;
`;

const simpleQuery = "SELECT * FROM tweets_nsql;";

const client = new Client({ node: "http://localhost:9200" });

const migrateToElastic = async () => {
  const dataStream = await initDatabaseReadable(connection)(simpleQuery);
  // const dataStream = await fs
  //   .createReadStream("output.jsonl")
  //   .pipe(ndjson.parse());

  const sourceStream = dataStream
    .pipe(map(updateTweet))
    .pipe(ndjson.stringify());
  // .pipe(process.stdout)

  try {
    const result = await client.helpers.bulk({
      datasource: sourceStream,
      onDocument(doc) {
        return {
          index: { _index: "tweets", _id: doc.id },
        };
      },
      onDrop(doc) {
        console.error(doc);
      },
      // flushBytes: 5000000,
      concurrency: 1,
    });

    console.log(result);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};

migrateToElastic();
