const mysql = require('mysql');

const defaultPoolOpts = {
  connectionLimit : 10,
  host     : '127.0.0.1',
  port     : '4406',
  user     : 'root',
  password : 'password',
  database : 'information_schema'
};

let pool;
let poolOpts;
let query;

module.exports = {
  config(opts) {
    poolOpts = opts
  },
  pool: {
    get query() {
      if (!pool) {
        pool = mysql.createPool({...defaultPoolOpts, poolOpts});

        query = (...args) => new Promise((res, rej) => {
          pool.query(...args, (err, results) => {
            if (err) rej(err);
            else res(results);
          })
        });
      }
      return query;
    }
  }
}
