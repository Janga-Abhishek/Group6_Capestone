const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://revathysasi01:123Mongodb@cluster0.fxezvmm.mongodb.net/Group6_Capestone?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

const AppointmentSchema = new mongoose.Schema({
  doctorId: String,
  appointmentDate: String,
  appointmentTime: String,
  status: { type: String, default: "Available" },
});
const Appointment = mongoose.model("Appointment", AppointmentSchema);

// Define User schema
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: String,
  address: String,
  username: String,
  password: String,
  insuranceNumber: String,
  userType: String,
  registeredDate: { type: Date, default: Date.now },
});
const User = mongoose.model("User", UserSchema);

//DEPARTMENT SCHEMA
const DepartmentSchema=new mongoose.Schema({
  departmentname:String
});
const Department=mongoose.model("Department",DepartmentSchema);


//DEFINE DOCTOR SCHEMA
const DoctorSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: String,
  address: String,
  username: String,
  password: String,
  userType: String,
  registeredDate: { type: Date, default: Date.now },
});
const Doctor = mongoose.model("Doctor", DoctorSchema);

const UserAppointmentSchema = new mongoose.Schema({
  username: { type: String, ref: "User" },
  appointmentdate: String,
  appointmenttime: String,
  issuedescription: String,
});

const BookedAppointment = mongoose.model(
  "BookedAppointment",
  UserAppointmentSchema
);

// Define GraphQL schema
const typeDefs = gql`
  scalar Date
  type Appointment {
    id: ID!
    doctorId: String!
    appointmentDate: String!
    appointmentTime: String!
    status: String!
  }

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phonenumber: String!
    address: String!
    insuranceNumber: String!
    username: String!
    password: String!
    userType: String!
    registeredDate: Date!
  }

  #typedefs of doctor
  type Doctor {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phonenumber: String!
    address: String!
    username: String!
    password: String!
    userType: String!
    registeredDate: Date!
  }

  type BookedAppointment {
    id: ID!
    username: String!
    appointmentdate: String!
    appointmenttime: String!
    issuedescription: String!
  }


  type Department{
    id:ID!
    departmentname:String!
  }


  type Query {
    user(id: ID!): User
    users: [User]
    checkUsername(username: String!): Boolean
    checkEmail(email: String!): Boolean
    appointment(id: ID!): Appointment
    appointments: [Appointment]
    doctor(id: ID!): Doctor
    doctors: [Doctor]
    bookedappointments: [BookedAppointment]
    bookedappointment(id: ID!): BookedAppointment
    department(id:ID!):Department
    departments:[Department]
  }

  type Mutation {
    RegisterUser(
      firstname: String!
      lastname: String!
      email: String!
      phonenumber: String!
      address: String!
      insuranceNumber: String!
      username: String!
      password: String!
      userType: String!
    ): User
    loginUser(username: String!, password: String!): User
    loginDoctor(username: String!, password: String!): Doctor

    #REGISTER DEPARTMENT
    RegisterDepartment(
      departmentname:String!
    ):Department


    BookAppointment(
      username: String!
      appointmentdate: String!
      appointmenttime: String!
      issuedescription: String!
    ): BookedAppointment

    #MUTATION TO REGISTER DOCTOR
    RegisterDoctor(
      firstname: String!
      lastname: String!
      email: String!
      phonenumber: String!
      address: String!
      username: String!
      password: String!
      userType: String!
    ): Doctor
    createAppointment(
      doctorId: ID!
      appointmentDate: String!
      appointmentTime: String!
    ): Appointment
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("User not found");
      }
    },

    //QUERY FOR DOCTOR
    doctor: async (_, { id }) => {
      try {
        const doctor = await Doctor.findById(id);
        return doctor;
      } catch (error) {
        throw new Error("Doctor not found");
      }
    },

    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    /*QUERY TO RETRIVE ALL DEPARTMENTS */
    departments:async()=>{
      try{
        return await Department.find();
      }
      catch(error)
      {
        throw new Error('Error fetching depaertments');
      }
    },
    department:async(_, {id}) =>{
      try
      {
        return await Department.findById(id);
      }
      catch(error)
      {
        throw new Error('Error fetching single department');
      }
    },
    /*QUERY TO RETRIVE DOCTORS BASED ON USERTYPE */
    doctors: async () => {
      try {
        const doctors = await Doctor.find({ userType: "doctor" });
        return doctors;
      } catch (error) {
        throw new Error("Error fetching list of all doctors details");
      }
    },
    appointment: async (_, { id }) => {
      try {
        return await Appointment.findById(id);
      } catch (error) {
        throw new Error("Appointment not found");
      }
    },
    appointments: async () => {
      try {
        return await Appointment.find();
      } catch (error) {
        throw new Error("Error fetching appointments");
      }
    },
    checkUsername: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        return !!user;
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    checkEmail: async (_, { email }) => {
      try {
        const user = await User.findOne({ email });
        return !!user;
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    bookedappointment: async (_, { id }) => {
      try {
        const appointment = await BookedAppointment.findById(id);
        return appointment;
      } catch (error) {
        throw new Error("Booked appointment not found");
      }
    },
    bookedappointments: async () => {
      try {
        const bookedAppointments = await BookedAppointment.find();
        const validAppointments = bookedAppointments.filter(
          (appointment) => appointment.username !== null
        );
        return validAppointments;
      } catch (error) {
        throw new Error("Error fetching booked appointments");
      }
    },
  },

  Mutation: {
    RegisterUser: async (
      _,
      {
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        insuranceNumber,
        username,
        password,
        userType,
      }
    ) => {
      try {
        const user = new User({
          firstname,
          lastname,
          email,
          phonenumber,
          address,
          insuranceNumber,
          username,
          password,
          userType,
        });
        await user.save();
        return user;
      } catch (error) {
        throw new Error("Error registering user");
      }
    },
    //MUTATION TO REGISTER DOCTOR
    RegisterDoctor: async (
      _,
      {
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        username,
        password,
        userType,
      }
    ) => {
      try {
        const doctor = new Doctor({
          firstname,
          lastname,
          email,
          phonenumber,
          address,
          username,
          password,
          userType,
        });
        await doctor.save();
        return doctor;
      } catch (error) {
        throw new Error("Error registering doctor");
      }
    },

    //MUTATION TO REGISTER DEPARTMENT
    RegisterDepartment:async(_,{departmentname})=>{
      try{
        const department=new Department({
          departmentname
        });
        await department.save();
        return department;
      }
      catch(error)
      {
        throw new Error("Error Registering Department")
      }
    },
    createAppointment: async (
      _,
      { doctorId, appointmentDate, appointmentTime }
    ) => {
      const appointment = new Appointment({
        doctorId,
        appointmentDate,
        appointmentTime,
      });
      try {
        return await appointment.save();
      } catch (error) {
        throw new Error("Error creating appointment");
      }
    },

    loginUser: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username, password });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      } catch (error) {
        console.error("Error in loginUser resolver:", error);
        throw new Error("Invalid credentials");
      }
    },
    loginDoctor: async (_, { username, password }) => {
      try {
        const user = await Doctor.findOne({ username, password });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        return user;
      } catch (error) {
        console.error("Error in loginDoctor resolver:", error);
        throw new Error("Invalid credentials");
      }
    },
    BookAppointment: async (
      _,
      { username, appointmentdate, appointmenttime, issuedescription }
    ) => {
      try {
        const appointment = new BookedAppointment({
          username,
          appointmentdate,
          appointmenttime,
          issuedescription,
        });
        await appointment.save();
        return appointment;
      } catch (error) {
        console.error("Error saving appointment:", error.message);
        throw new Error("Error saving appointment");
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
