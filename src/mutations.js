import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const CREATE_EXPENDITURE = gql`
  mutation CreateExpenditure($name: String!, $cost: Float!) {
    createExpenditure(name: $name, cost: $cost) {
      id
      name
      cost
      user {
        name
        email
      }
    }
  }
`;
