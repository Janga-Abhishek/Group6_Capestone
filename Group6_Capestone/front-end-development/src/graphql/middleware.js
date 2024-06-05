import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      email
      userType
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstname:String!,
    $lastname:String!,
    $email: String!,
    $phonenumber:String!,
    $address:String!,
    $insuranceNumber:String!,
    $username: String!,
    $password: String!,
    $userType: String!) {  
    RegisterUser(firstname: $firstname,lastname: $lastname,email: $email,phonenumber: $phonenumber,
      address: $address,insuranceNumber: $insuranceNumber,username: $username, password: $password,userType: $userType) {
      id 
      firstname
      lastname
      email
      phonenumber
      address
      insuranceNumber
      username
      password
      userType
    }
  }
`;
