const express= require("express")
const colors = require("colors")
require("dotenv").config()
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/schema")
const connectDB = require("./config/db")
const cors = require("cors")
const port = process.env.PORT || 3212

const app = express()

connectDB()

app.use(cors())

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"
}))

app.listen(port, () => {
    console.log(`Sever is running on http://localhost:${port}`)
})