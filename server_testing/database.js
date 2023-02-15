const { POOL, Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "st@rs",
    host: "localhost",
    port: 5432
})

pool.query(`CREATE DATABASE chore-manager;`)
.then((response) => {
    console.log('database created')
    console.log(response);
})
.catch((err) => {
    console.log(err);
})

module.exports = pool;