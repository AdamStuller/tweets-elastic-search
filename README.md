# tweets-elastic-search

Repository contains script for importing tweets from postgres db to elastic search. For successful import one needs to have postgres started and database filled. Elastic can be spinned up with:

```
npm install
npm run start:elasticsearch
```

Note that docker must be installed and running. This command starts three-node cluster of elastic. 

To import tweets run 

```
npm run import
```

