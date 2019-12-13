const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const schema = require('./graphql/schema/schema')
const MongoClient = require('mongoose')

const app = express()

app.use(cors())
MongoClient.connect('connection string goes here', { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(2000,() => {
    console.log("Server Running on port 2000")
})
