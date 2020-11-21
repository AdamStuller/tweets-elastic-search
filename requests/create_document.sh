#! /bin/bash

curl --location --request POST 'localhost:9200/tweets/_doc/1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "content": "Our Hopley community champions training to other members in Hopley how to make rewashable face masks.During the training the women discussed ways to reduce the spread of #COVID19. #WashYourHands #WearAMask @unwomenzw @SwedeninZW @kubatana  @OxfaminZim @womensvoicezw @WCOZIMBABWE https://t.co/W8oXiUxaVh",
  "location": null,
  "retweet_count": 0,
  "favorite_count": 10,
  "happened_at": "2020-08-07T09:56:31.000Z",
  "author": {
    "id": 3947294501,
    "screen_name": "IMUNTzw",
    "name": "Imba Mukadzi Umuzi Ngumama Trust",
    "description": "IMUNT is a women organization with a mission to empower women socially,economically and politically advocating for their rights.",
    "followers_count": 300,
    "friends_count": 642,
    "statuses_count": 709
  },
  "country": {
    "code": "ZW",
    "name": "Zimbabwe"
  },
  "tags": [
    "WashYourHands",
    "COVID19",
    "WearAMask"
  ],
  "tweet_mentions": [
    {
      "id": 3318651681,
      "screen_name": "OxfaminZim",
      "name": "Oxfam In Zimbabwe",
      "description": "Oxfam is a global movement of people who won’t live with the injustice of poverty. For more information go to https://t.co/B4ixcyEdeI Thank you.",
      "followers_count": 4187,
      "friends_count": 1063,
      "statuses_count": 1716
    },
    {
      "id": 1220796002,
      "screen_name": "SwedeninZW",
      "name": "Sweden in Zimbabwe 🇸🇪",
      "description": null,
      "followers_count": null,
      "friends_count": null,
      "statuses_count": null
    },
    {
      "id": 920289740733210600,
      "screen_name": "womensvoicezw",
      "name": "Women'\''svoicezw",
      "description": null,
      "followers_count": null,
      "friends_count": null,
      "statuses_count": null
    },
    {
      "id": 1614903937,
      "screen_name": "WCOZIMBABWE",
      "name": "Women'\''s Coalition of Zim",
      "description": null,
      "followers_count": null,
      "friends_count": null,
      "statuses_count": null
    },
    {
      "id": 1166104911546933200,
      "screen_name": "unwomenzw",
      "name": "UN Women Zimbabwe",
      "description": null,
      "followers_count": null,
      "friends_count": null,
      "statuses_count": null
    },
    {
      "id": 29444440,
      "screen_name": "kubatana",
      "name": "Kubatana",
      "description": null,
      "followers_count": null,
      "friends_count": null,
      "statuses_count": null
    }
  ]
}'