const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { ApolloServer: ApolloServerStandalone } = require("apollo-server");
const { gql } = require("apollo-server");

const cors = require("cors");
const fs = require("fs");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://revathysasi01:123Mongodb@cluster0.fxezvmm.mongodb.net/Group6_Capestone?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));
const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String,
  documentName: String,
  username: String,
});
const File = mongoose.model("File", fileSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
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
const DepartmentSchema = new mongoose.Schema({
  departmentname: String,
});
const Department = mongoose.model("Department", DepartmentSchema);

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
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  registeredDate: { type: Date, default: Date.now },
});
const Doctor = mongoose.model("Doctor", DoctorSchema);

//Define User appointment schema
const UserAppointmentSchema = new mongoose.Schema({
  username: { type: String, ref: "User" },
  appointmentDate: String,
  appointmentTime: String,
  issueDescription: String,
  subscription: Boolean,
  doctorId: { type: mongoose.Types.ObjectId, ref: "Doctor" },
});
const BookedAppointment = mongoose.model(
  "BookedAppointment",
  UserAppointmentSchema
);
const UserHistorySchema = new mongoose.Schema({
  username: String,
  appointmentId: { type: mongoose.Types.ObjectId, ref: "BookedAppointment" },
  appointmentDate: String,
  appointmentTime: String,
  issueDescription: String,
  prescribedMedicines: String,
  doctorId: { type: mongoose.Types.ObjectId, ref: "Doctor" },
  status: String,
  additionalNotes: String,
});
const UserHistory = mongoose.model("UserHistory", UserHistorySchema);

// Define GraphQL schema
const typeDefs = gql`
  scalar Date
  type File {
    id: ID!
    filename: String!
    path: String!
    mimetype: String!
    documentName: String!
    username: String!
  }
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
    departmentId: ID!
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
    doctorId: String!
    appointmentDate: String!
    appointmentTime: String!
    issueDescription: String!
    subscription: Boolean!
  }

  type UserHistory {
    id: ID!
    username: String!
    appointmentId: ID!
    appointmentDate: String!
    appointmentTime: String!
    issueDescription: String!
    prescribedMedicines: String!
    doctorId: ID!
    status: String!
    additionalNotes: String!
  }

  type Department {
    id: ID!
    departmentname: String!
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
    department(id: ID!): Department
    departments: [Department]
    doctorsByDepartment(departmentId: ID!): [Doctor!]!
    availableDates(doctorId: ID!): [Appointment!]!
    availableTimes(doctorId: ID!, appointmentDate: String!): [Appointment!]!
    bookedappointments(doctorId: ID!, date: String!): [BookedAppointment]
    bookedappointment(id: ID!): BookedAppointment
    userHistory(id: ID!): UserHistory
    userHistories(username: String!): [UserHistory]
    appointmentDetails(appointmentId: ID!): [UserHistory]
    deleteBookedAppointment(id: ID!): BookedAppointment
    files: [File]
  }

  type Mutation {
    deleteBookedAppointment(id: ID!): BookedAppointment
    uploadFile(filename: String!, path: String!, mimetype: String!): File

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
    RegisterDepartment(departmentname: String!): Department

    BookAppointment(
      username: String!
      doctorId: String!
      appointmentDate: String!
      appointmentTime: String!
      issueDescription: String!
      subscription: Boolean!
    ): BookedAppointment

    createUserHistory(
      username: String!
      appointmentId: ID!
      appointmentDate: String!
      appointmentTime: String!
      issueDescription: String!
      prescribedMedicines: String!
      doctorId: ID!
      status: String!
      additionalNotes: String!
    ): UserHistory

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
      departmentId: ID!
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
    files: async () => {
      return await File.find();
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("User not found");
      }
    },
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
    departments: async () => {
      try {
        return await Department.find();
      } catch (error) {
        throw new Error("Error fetching depaertments");
      }
    },
    department: async (_, { id }) => {
      try {
        return await Department.findById(id);
      } catch (error) {
        throw new Error("Error fetching single department");
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

    // bookedappointments: async () => {
    //   try {
    //     const bookedAppointments = await BookedAppointment.find();
    //     const validAppointments = bookedAppointments.filter(
    //       (appointment) => appointment.username !== null
    //     );
    //     return validAppointments;
    //   } catch (error) {
    //     throw new Error("Error fetching booked appointments");
    //   }
    // },
    bookedappointments: async (_, { doctorId, date }) => {
      try {
        console.log("Doctor ID:", doctorId);
        console.log("Appointment Date:", date);

        const objectId = new mongoose.Types.ObjectId(doctorId);

        const bookedAppointments = await BookedAppointment.find({
          doctorId: objectId,
          appointmentDate: date,
        });

        return bookedAppointments.filter(
          (appointment) => appointment.username !== null
        );
      } catch (error) {
        console.error("Error fetching booked appointments:", error.message);
        throw new Error("Error fetching booked appointments: " + error.message);
      }
    },

    doctorsByDepartment: async (_, { departmentId }) => {
      // Fetch and return doctors for the given department ID
      return await Doctor.find({ departmentId });
    },

    availableDates: async (_, { doctorId }) => {
      // Fetch and return available dates for the given doctor ID
      const appointments = await Appointment.find({
        doctorId,
        status: "Available",
      });
      const removeDuplicates = (array, key) => {
        return [...new Map(array.map((item) => [item[key], item])).values()];
      };

      const uniqueAppointments = removeDuplicates(
        appointments,
        "appointmentDate"
      );
      return uniqueAppointments;
    },

    availableTimes: async (_, { doctorId, appointmentDate }) => {
      // Fetch and return available times for the given doctor ID and date
      const appointments = await Appointment.find({
        doctorId,
        appointmentDate,
        status: "Available",
      });
      const removeDuplicates = (array, key) => {
        return [...new Map(array.map((item) => [item[key], item])).values()];
      };

      const uniqueAppointments = removeDuplicates(
        appointments,
        "appointmentTime"
      );
      return uniqueAppointments;
    },

    // userHistory: async (_, { id }) => {
    //   try {
    //     const history = await UserHistory.findById(id);
    //     return history;
    //   } catch (error) {
    //     throw new Error("Error fetching user history");
    //   }
    // },

    userHistories: async (_, { username }) => {
      console.log("Received username:", username); // Log the input parameter
      try {
        const histories = await UserHistory.find({ username });
        console.log("Fetched histories:", histories); // Log the fetched data
        return histories;
      } catch (error) {
        console.error("Error fetching user histories:", error.message);
        throw new Error("Error fetching user histories");
      }
    },

    appointmentDetails: async (_, { appointmentId }) => {
    
      console.log("Received appointmentId:", appointmentId); // Log the input parameter
      try {
        const histories = await UserHistory.find({ appointmentId });
        console.log("Fetched histories:", histories); // Log the fetched data
        return histories;
      } catch (error) {
        console.error("Error fetching user histories:", error.message);
        throw new Error("Error fetching user histories");
      }
    },
  },

  Mutation: {
    uploadFile: async (_, { filename, path, mimetype }) => {
      const file = new File({ filename, path, mimetype });
      await file.save();
      return file;
    },
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
        departmentId,
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
          departmentId,
        });
        await doctor.save();
        return doctor;
      } catch (error) {
        throw new Error("Error registering doctor");
      }
    },

    //MUTATION TO REGISTER DEPARTMENT
    RegisterDepartment: async (_, { departmentname }) => {
      try {
        const department = new Department({
          departmentname,
        });
        await department.save();
        return department;
      } catch (error) {
        throw new Error("Error Registering Department");
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
      {
        username,
        doctorId,
        appointmentDate,
        appointmentTime,
        issueDescription,
        subscription,
      }
    ) => {
      try {
        const takenappointment = await Appointment.findOne({
          doctorId,
          appointmentDate,
          appointmentTime,
          status: "Available",
        });
        if (!takenappointment)
          throw new Error("The selected time slot is no longer available.");

        takenappointment.status = "taken";
        await takenappointment.save();

        const appointment = new BookedAppointment({
          username,
          doctorId,
          appointmentDate,
          appointmentTime,
          issueDescription,
          subscription,
        });
        await appointment.save();
        return appointment;
      } catch (error) {
        console.error("Error saving appointment:", error.message);
        throw new Error("Error saving appointment");
      }
    },
    createUserHistory: async (_, args) => {
      try {
        const userHistory = new UserHistory(args);
        await userHistory.save();
        return userHistory;
      } catch (error) {
        throw new Error("Error creating user history");
      }
    },
    deleteBookedAppointment: async (_, { id }) => {
      try {
        const deletedAppointment = await BookedAppointment.findByIdAndDelete(
          id
        );
        if (!deletedAppointment) {
          throw new Error("Appointment not found");
        }
        return deletedAppointment;
      } catch (error) {
        throw new Error(`Failed to delete appointment: ${error.message}`);
      }
    },
  },
};

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Create Apollo Server standalone instance for another use case
const standaloneServer = new ApolloServerStandalone({ typeDefs, resolvers });

const app = express();
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend's URL if different
  })
);
app.post("/upload", upload.single("file"), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "uploads", req.file.originalname);

  // Read additional fields
  const documentName = req.body.documentName;
  const username = req.body.username;

  fs.rename(tempPath, targetPath, (err) => {
    if (err) return res.sendStatus(500);

    // Save file info to database
    const file = new File({
      filename: req.file.originalname,
      path: targetPath,
      mimetype: req.file.mimetype,
      documentName, // Save the document name
      username, // Save the username
    });

    file
      .save()
      .then(() => {
        res.status(200).json({
          message: "File uploaded successfully",
          filePath: targetPath,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to save file info" });
      });
  });
});
app.get("/files", async (req, res) => {
  const { username } = req.query;
  try {
    const documents = await File.find({ username });
    console.log("Fetched documents:", documents);

    res.json({ files: documents }); // Ensure the response uses 'files'
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Serve files based on filename
app.get("./uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "uploads", filename);
  console.log("Fetched filepath:", filePath);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found");
    }

    // Serve the file
    res.sendFile(filePath);
  });
});

// Start the server
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
// server.start().then(() => {
//   server.applyMiddleware({ app });

//   // Start the Express server
//   app.listen({ port: 4000 }, () =>
//     console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
//   );
// });
// app.listen({ port: 4000 }, () =>
//   console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
// );
const PORT = 4001;
app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
});

// Optionally, start the standalone Apollo Server on another port
standaloneServer.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Standalone Apollo Server ready at ${url}`);
});
