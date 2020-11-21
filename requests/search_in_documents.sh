#! /bin/bash

curl --location --request POST 'localhost:9200/tweets/_search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "query": {
        "match": {
            "author.name":"Donald Trump"
        }
    }
}'