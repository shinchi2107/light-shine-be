const mongoose = require("mongoose");
const  { DB_HOST, DB_NAME } = process.env;

async function connectDB() {
    try {
        const db = await mongoose.connect(DB_HOST, {
            dbName: DB_NAME,
        });
        console.log(`Connected successfully to database: ${db.connection.name}`);
    } catch (error) {
        console.log(error)
        throw new Error(`Error connecting to database: ${JSON.stringify(error)}`);
    }
}

module.exports = { connectDB };