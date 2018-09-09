import { gql } from 'apollo-boost';

/* Recipes queries */

export const GET_ALL_RECIPES = gql`

query {
    getAllRecipes {
        name
        description
        instructions
        category
        likes
        username
    }
}

`
/* User Query */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }

`;


/* Recipes Mutation */

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }

`;

/* User Mutation */

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!){
  signinUser(username: $username, password: $password) {
    token
  }
}
`