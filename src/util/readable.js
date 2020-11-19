
const QueryStream = require("pg-query-stream");

const initDatabaseReadable = (connection) => (queryString) => {
  return connection
    .then((client) => {
      const query = new QueryStream(queryString);
      const stream = client.query(query);
      return stream;
    })
    .catch((error) => error);
};

module.exports = {
  initDatabaseReadable,
};
