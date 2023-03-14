const { Pool } = require("pg");
const fs = require("fs");

const poolConfig = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "Bassguitar1",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "waka",
  
};

const pool = new Pool(poolConfig);

const insertData = async () => {
  const seedQuery = fs.readFileSync("./user.sql", { encoding: "utf8" });
  const client = await pool.connect();
  try {
    await client.query(seedQuery);
    console.log("Seeding completed");
  } catch (error) {
    console.error(error);
  }
};

// insertData();
// pool.end();

module.exports = pool;
