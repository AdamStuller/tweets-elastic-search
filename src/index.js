#!/usr/bin/env node
const ndjson = require("ndjson");
const { map, filter } = require("./util/transforms");
const { initDatabaseReadable } = require("./util/readable");

const { connectDb } = require("./db");
const { stdout } = require("process");

const connection = connectDb({
  host: "localhost",
  port: "5432",
  user: "root",
  password: "qwerty",
  database: "tweets",
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
SELECT t.id as id,
       content,
       location,
       retweet_count,
       favorite_count,
       happened_at,
       author_id,
       row_to_json(a.*) as author,
       row_to_json(c.*) as country,  
       t_h.tags         as tags,
       t_m_a.tweet_mentions
FROM tweets t
         join countries c on t.country_id = c.id
         JOIN accounts a on t.author_id = a.id
         JOIN t_h on t_h.tweet_id = t.id
         JOIN t_m_a ON t_m_a.tweet_id = t.id;
`;

initDatabaseReadable(connection)(queryString).then((stream) => {
  stream.pipe(ndjson.stringify()).pipe(stdout);
});
