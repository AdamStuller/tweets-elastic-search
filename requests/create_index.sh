#! /bin/bash 

curl --location --request PUT 'localhost:9200/tweets/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas": 2
    },
    "mappings": {
        "dynamic": "strict",
        "properties": {
            "id": {
                "type": "keyword"
            },
            "content": {
                "type": "text"
            },
            "location": {
                "type": "point"
            },
            "retweet_count": {
                "type": "integer"
            },
            "favorite_count": {
                "type": "integer"
            },
            "happened_at": {
                "type": "date"
            },
            "author": {
                "properties": {
                    "id": {
                        "type": "keyword"
                    },
                    "screen_name": {
                        "type": "keyword"
                    },
                    "name": {
                        "type": "keyword"
                    },
                    "description": {
                        "type": "text"
                    },
                    "followers_count": {
                        "type": "integer"
                    },
                    "friends_count": {
                        "type": "integer"
                    },
                    "statuses_count": {
                        "type": "integer"
                    }
                }
            },
            "country": {
                "properties": {
                    "code": {
                        "type": "keyword"
                    },
                    "name": {
                        "type": "keyword"
                    }
                }
            },
            "tags": {
                "type": "text"
            },
            "tweet_mentions": {
                "type": "nested",
                "properties": {
                    "id": {
                        "type": "long"
                    },
                    "screen_name": {
                        "type": "keyword"
                    },
                    "name": {
                        "type": "keyword"
                    },
                    "description": {
                        "type": "text"
                    },
                    "followers_count": {
                        "type": "integer"
                    },
                    "friends_count": {
                        "type": "integer"
                    },
                    "statuses_count": {
                        "type": "integer"
                    }
                }
            }
        }
    }
}'