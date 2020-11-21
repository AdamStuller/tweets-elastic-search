#! /bin/bash

curl --location --request POST 'localhost:9200/tweets/_update/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "script": {
        "source": "ctx._source.retweet_count = ctx._source.retweet_count + 1"
    }
}'