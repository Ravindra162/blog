const {Client} = require('pg');

const client = new Client({
    connectionString:"postgresql://blog_owner:MVgflesc17JT@ep-shiny-bush-a192pbbq.ap-southeast-1.aws.neon.tech/blog?sslmode=require"
})

client.on("connect",()=>{
    console.log("Database connected")
})
client.on("end",()=>{
    console.log("connection ended")
})

module.exports = {
    client
}