const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema/schema')
var MongoClient = require('mongoose')

const app = express()

MongoClient.connect('mongodb+srv://sGurkaran:qmxWco8121TB2wS0@gurkaranmaincluster-auih8.mongodb.net/graphql?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(3000,() => {
    console.log("Server Running on port 3000")
})
