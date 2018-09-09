import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/withSessin";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Search from "./components/Recipe/Search";
import Profile from "./components/Profile/Profile";
import AddRecipe from "./components/Recipe/AddRecipe";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },

  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },

  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
  }
});

const Root = ({ refetch }) => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/search"  component={Search} />
        <Route path="/profile"  component={Profile} />
        <Route path="/recepi/add"  component={AddRecipe} />


        <Route path="/signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/signup" render={() => <Signup refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithsession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithsession />
  </ApolloProvider>,
  document.getElementById("root")
);

//lesson 36
