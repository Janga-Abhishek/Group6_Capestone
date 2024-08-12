import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
    query GetProducts {
        products {
            id
            name
            description
            unitAmount
            currency
        }
    }
`;

export const CREATE_PAYMENT_INTENT = gql`
    mutation CreatePaymentIntent($productId: ID!) {
        createPaymentIntent(productId: $productId) {
            clientSecret
        }
    }
`;


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
    $departmentId:ID!
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
      departmentId:$departmentId
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
      departmentId
    }
  }
`;

//MUTATION FOR REGISTER DEPARTMENT
export const REGISTER_DEPARTMENT=gql`
mutation RegisterDepartment(
  $departmentname:String!
){
  RegisterDepartment(
    departmentname:$departmentname
  ) {
    id
    departmentname
  }
}
`

export const BOOK_APPOINTMENT = gql`
  mutation BookAppointment(
    $username: String!
    $doctorId: String!
    $appointmentDate: String!
    $appointmentTime: String!
    $issueDescription: String!
    $subscription: Boolean!
  ) {
    BookAppointment(
      username: $username
      doctorId: $doctorId
      appointmentDate: $appointmentDate
      appointmentTime: $appointmentTime
      issueDescription: $issueDescription
      subscription: $subscription
    ) {
      id
      username
      doctorId
      appointmentDate
      appointmentTime
      issueDescription
      subscription
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

export const GET_DEPARTMENTS=gql`
query departments{
departments{
  id
  departmentname
}
}`;


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



export const GET_DOCTORS_BY_DEPARTMENT = gql`
  query GetDoctorsByDepartment($departmentId: ID!) {
    doctorsByDepartment(departmentId: $departmentId) {
      id
      firstname
      lastname
    }
  }
`;

export const GET_AVAILABLE_DATES = gql`
  query GetAvailableDates($doctorId: ID!) {
    availableDates(doctorId: $doctorId){
    appointmentDate
    }
  }

`;

export const GET_AVAILABLE_TIMES = gql`
  query GetAvailableTimes($doctorId: ID!, $date: String!) {
    availableTimes(doctorId: $doctorId, appointmentDate: $date){
    appointmentTime
    }
  }
`;

export const GET_USER_APPOINTMENTS_HISTORY =gql`
 query GetUserHistories($username: String!) {
   userHistories(username: $username) {
    appointmentId
    appointmentDate
    appointmentTime
    issueDescription
    prescribedMedicines
    doctorId
    status
    additionalNotes
  }
}
`

export const GET_APPOINTMENT_DETAILS = gql`
  query GetAppointmentDetails($appointmentId: ID!) {
    appointmentDetails(appointmentId: $appointmentId) {
      appointmentId
      appointmentDate
      appointmentTime
      doctorId
      issueDescription
      prescribedMedicines
      status
      additionalNotes
    }
  }
`;

export const GET_UPCOMING_APPOINTMENT = gql`
query GetUpcomingAppointments($username: String!) {
  getUpcomingAppointments(username: $username) {
    appointmentDate
    appointmentTime
  }
}
`;

