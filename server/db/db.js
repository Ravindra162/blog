const {Client} = require('pg');
require('dotenv').config()
const connectionString = process.env.DB_CONNECTION_STRING
const client = new Client({
    connectionString:process.env.DB_CONNECTION_STRING})

client.on("connect",()=>{
    console.log("Database connected")
})
client.on("end",()=>{
    console.log("connection ended")
})

module.exports = {
    client
}