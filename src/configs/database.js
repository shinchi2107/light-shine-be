const mongoose = require("mongoose");
const { log } = require("@utils/logger/log");
const  { DB_HOST, DB_NAME } = process.env;

async function connectDB() {
    try {
        const db = await mongoose.connect(DB_HOST, {
            dbName: DB_NAME,
        });
        log(`Connected successfully to database: ${db.connection.name}`);
    } catch (error) {
        log(`Error connecting to database: ${JSON.stringify(error)}`);
        throw new Error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
}

module.exports = { connectDB };