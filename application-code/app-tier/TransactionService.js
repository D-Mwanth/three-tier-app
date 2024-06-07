const getDbCreds = require('./DbConfig');
const mysql = require('mysql');

let con;

// Initialize the database connection
getDbCreds().then(dbcreds => {
  con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
  });

  con.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      throw err;
    }
    console.log('Connected to the database');
  });
});

function addTransaction(amount, desc) {
  const query = `INSERT INTO \`transactions\` (\`amount\`, \`description\`) VALUES ('${amount}', '${desc}')`;
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("Adding to the table should have worked");
  });
  return 200;
}

function getAllTransactions(callback) {
  const query = "SELECT * FROM transactions";
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("Getting all transactions...");
    return callback(result);
  });
}

function findTransactionById(id, callback) {
  const query = `SELECT * FROM transactions WHERE id = ${id}`;
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log(`Retrieving transactions with id ${id}`);
    return callback(result);
  });
}

function deleteAllTransactions(callback) {
  const query = "DELETE FROM transactions";
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("Deleting all transactions...");
    return callback(result);
  });
}

function deleteTransactionById(id, callback) {
  const query = `DELETE FROM transactions WHERE id = ${id}`;
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log(`Deleting transaction with id ${id}`);
    return callback(result);
  });
}

module.exports = {
  addTransaction,
  getAllTransactions,
  deleteAllTransactions,
  findTransactionById,
  deleteTransactionById
};