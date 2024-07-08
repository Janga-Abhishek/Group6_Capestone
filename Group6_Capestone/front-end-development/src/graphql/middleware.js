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

//MIDDLEWARE REGISTER DOCTOR

export const REGISTER_DOCTOR = gql`
  mutation RegisterDoctor(
    $firstname:String!,
    $lastname:String!,
    $email: String!,
    $phonenumber:String!,
    $insuranceNumber:String!,
    $address:String!,
    $username: String!,
    $password: String!,
    $userType: String!) {  
    RegisterDoctor(firstname: $firstname,lastname: $lastname,email: $email,phonenumber: $phonenumber,
      insuranceNumber:$insuranceNumber,address: $address,username: $username, password: $password,userType: $userType) {
      id 
      firstname
      lastname
      email
      phonenumber
      insuranceNumber
      address
      username
      password
      userType
    }
  }
`;

export const BOOK_APPOINTMENT = gql`
  mutation BookAppointment(
    $username:String!
    $appointmentdate:String!,
    $appointmenttime:String!,
    $issuedescription: String!) {  
    BookAppointment(username:$username,appointmentdate: $appointmentdate,appointmenttime: $appointmenttime,issuedescription: $issuedescription) {
      id
      username
      appointmentdate
      appointmenttime
      issuedescription
    }
  }
`;

export const CHECK_USERNAME = gql`
  query CheckUsername($username: String!) {
    checkUsername(username: $username)
  }
`;

export const CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;


/*QUERIES */

export const GET_USERS=gql `
query GetUsers{
  users{
      id 
      firstname
      lastname
      email
      phonenumber
      address
      insuranceNumber
      username
      userType 
  }
}
`;

export const GET_DOCTORS=gql`
query GetDoctors{
  doctors{
    id
    firstname
    lastname
    email
    phonenumber
    address
    username
    userType 
}
}
`;