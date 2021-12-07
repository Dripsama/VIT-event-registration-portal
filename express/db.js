const Pool = require("pg").Pool;

//add postgress db details here
const pool = new Pool({
  host: "",
  port: "",
  user: "",
  password: "",
  database: "",
});

module.exports = pool;
