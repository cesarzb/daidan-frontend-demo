import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_EXPENDITURES = gql`
  query GetExpenditures {
    expenditures {
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
