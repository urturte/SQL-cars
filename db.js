const { Pool } = require("pg");

const connectionString =
  "postgres://fyjtrebw:McVBX3-4QPspoN_Lr3wV0TDiamxahyKU@mouse.db.elephantsql.com/fyjtrebw";

const pool = new Pool({
  connectionString,
});

module.exports = pool;