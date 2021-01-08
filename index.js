const mysql = require('./mysql-pool');
mysql.config(); // optional
const { query } = mysql.pool;

console.log(">> execute `./run-docker-mysql.sh` to start a local docker container");

const tableId = 'X' + Math.random().toString().substr(2)
const q = {
  createDb: 'CREATE DATABASE IF NOT EXISTS temp CHARACTER SET=\'utf8\'',
  create: 'CREATE TABLE `temp`.`?` (id INT(10) NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL,PRIMARY KEY (id));',
  insert: 'INSERT INTO `temp`.`?` (name) VALUES (?)',
  select: 'SELECT * FROM `temp`.`?`',
  drop: 'DROP TABLE IF EXISTS `temp`.`?`; ',
}

query('SELECT * FROM tables')
.then(results => {
  console.log(2, JSON.stringify(results).substr(0, 99));
});

async function main() {
  await query(q.createDb, []);
  await query(q.create, [tableId]);
  await query(q.insert, [tableId, 'steve']);
  const results = await query(q.select, [tableId]);
  console.log(1, results);
  await query(q.drop, [tableId]);
}
main();
