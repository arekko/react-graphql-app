const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const Recipe = require("./models/Recipe");
const User = require("./models/User");
const bodyParser = require("body-parser");
const cors = require('cors');
const jwt = require('jsonwebtoken')
// Bring in graphql express middleware

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch(err => console.log(err));

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions))

// Set up JWT authentication meddleware

app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== "null") {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET)
      req.currentUser = currentUser; // add the user info to the request
    } catch(err) {
      console.error(err)
    }
  }
  next();
})

const PORT = process.env.PORT || 4444;

// Create graphql application

app.use("/graphiql", graphiqlExpress({ endpointURL: '/graphql' }));

//Connect schamas with graphql
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
