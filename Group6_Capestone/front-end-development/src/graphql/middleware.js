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
export const LOGIN_DOCTOR = gql`
  mutation loginDoctor($username: String!, $password: String!) {
    loginDoctor(username: $username, password: $password) {
      id
      username
      email
      userType
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $phonenumber: String!
    $address: String!
    $insuranceNumber: String!
    $username: String!
    $password: String!
    $userType: String!
  ) {
    RegisterUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      phonenumber: $phonenumber
      address: $address
      insuranceNumber: $insuranceNumber
      username: $username
      password: $password
      userType: $userType
    ) {
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
    $firstname: String!
    $lastname: String!
    $email: String!
    $phonenumber: String!
    $address: String!
    $username: String!
    $password: String!
    $userType: String!
  ) {
    RegisterDoctor(
      firstname: $firstname
      lastname: $lastname
      email: $email
      phonenumber: $phonenumber
      address: $address
      username: $username
      password: $password
      userType: $userType
    ) {
      id
      firstname
      lastname
      email
      phonenumber
      address
      username
      password
      userType
    }
  }
`;

export const BOOK_APPOINTMENT = gql`
  mutation BookAppointment(
    $username: String!
    $appointmentdate: String!
    $appointmenttime: String!
    $issuedescription: String!
  ) {
    BookAppointment(
      username: $username
      appointmentdate: $appointmentdate
      appointmenttime: $appointmenttime
      issuedescription: $issuedescription
    ) {
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

export const GET_USERS = gql`
  query GetUsers {
    users {
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

export const GET_DOCTORS = gql`
  query GetDoctors {
    doctors {
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
export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment(
    $doctorId: ID!
    $appointmentDate: String!
    $appointmentTime: String!
  ) {
    createAppointment(
      doctorId: $doctorId
      appointmentDate: $appointmentDate
      appointmentTime: $appointmentTime
    ) {
      id
      doctorId
      appointmentDate
      appointmentTime
      status
    }
  }
`;

export const GET_APPOINTMENTS = gql`
  query GetAppointments {
    appointments {
      id
      doctorId
      appointmentDate
      appointmentTime
      status
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation deleteAppointment($id: ID!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`;
export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $id: ID!
    $doctorId: ID!
    $date: String!
    $time: String!
    $issue: String
  ) {
    updateAppointment(
      id: $id
      doctorId: $doctorId
      date: $date
      time: $time
      issue: $issue
    ) {
      id
      doctorId
      date
      time
      issue
    }
  }
`;
