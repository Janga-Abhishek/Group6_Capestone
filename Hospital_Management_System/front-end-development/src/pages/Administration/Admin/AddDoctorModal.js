import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useMutation,useQuery, useLazyQuery } from "@apollo/client";
import { REGISTER_DOCTOR, CHECK_USERNAME, CHECK_EMAIL,GET_DEPARTMENTS } from '../../../graphql/middleware';

const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#1192DC",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "3%",
    transition: "background-color 0.3s ease",
};
const buttonHoverStyle = {
    backgroundColor: "#0a71b5",
};

const AddDoctorModal = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [registerDoctor] = useMutation(REGISTER_DOCTOR);
    const { data: departmentData, loading, error } = useQuery(GET_DEPARTMENTS);
    const [checkUsername] = useLazyQuery(CHECK_USERNAME);
    const [checkEmail] = useLazyQuery(CHECK_EMAIL);

    /*--------------ERROR MESSAGES------------------- */
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    /*--------------ALERT MESSAGES------------------- */
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");

    const handleDoctorRegistration = async (e) => {
        e.preventDefault();

        if (!(await validateForm())) {
            return;
        }

        try {
            const { data } = await registerDoctor({
                variables: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password,
                    phonenumber: phoneNumber,
                    address: address,
                    username: username,
                    userType: "doctor",
                    departmentId: departmentId,
                }
            });
            setAlertMessage("Registration Successful!");
            setAlertVariant("success");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Close alert after 3 seconds
            clearForm();
        } catch (error) {
            console.error("Error Registering User:", error);
            setAlertMessage("Error registering doctor. Please try again.");
            setAlertVariant("danger");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Close alert after 3 seconds
        }
    }
    if (loading) return <p>Loading departments...</p>;
    if (error) return <p>Error loading departments: {error.message}</p>;

    const departments = departmentData?.departments || [];

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setAddress("");
        setPhoneNumber("");
    }

    const validateForm = async () => {
        // validation for name
        if (!firstName) {
            setFirstNameError("First Name is required!");
            return false;
        }
        if (!lastName) {
            setLastNameError("Last Name is required!");
            return false;
        }

        const validateName = (name) => {
            const regex = /^[A-Za-z\s]{2,50}$/;
            return regex.test(name);
        };

        if (validateName(firstName)) {
            setFirstNameError("");
        } else {
            setFirstNameError("First Name must be 2-50 characters long and contain only letters and spaces.");
            return false;
        }

        if (validateName(lastName)) {
            setLastNameError("");
        } else {
            setLastNameError("Last Name must be 2-50 characters long and contain only letters and spaces.");
            return false;
        }

        //validation for email id
        if (!email) {
            setEmailError("Email is required!");
            return false;
        }

        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (validateEmail(email)) {
            setEmailError("");
        } else {
            setEmailError("Invalid email address");
            return false;
        }

        if ((await checkEmail({ variables: { email } }))?.data?.checkEmail) {
            setEmailError("Email is already taken!");
            return false;
        } else {
            setEmailError("");
        }

        //Phone number
        if (!phoneNumber) {
            setPhoneNumberError("Phone Number is required!");
            return false;
        }

        const validatePhone = (phone) => {
            const regex = /^(\+1)?\d{10}$/;
            return regex.test(phone);
        };

        if (validatePhone(phoneNumber)) {
            setPhoneNumberError("");
        } else {
            setPhoneNumberError("Invalid phone number! Required Format: 123 123 1234 / +1 123 123 1234");
            return false;
        }

        //Username
        if (!username) {
            setUsernameError("Username is required!");
            return false;
        }

        const { data } = await checkUsername({ variables: { username } });
        console.log(data);
        if (data.checkUsername) {
            setUsernameError("Username is already taken!");
            return false;
        } else {
            setUsernameError("");
        }

        //Password
        if (!password) {
            setPasswordError("Password is required!");
            return false;
        }

        const validatePassword = (password) => {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
            return regex.test(password);
        };

        if (validatePassword(password)) {
            setPasswordError("");
        } else {
            setPasswordError("Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.");
            return false;
        }

        //Address
        if (!address) {
            setAddressError("Address is required!");
            return false;
        }
        return true;
    }

    return (
        <div className="registerContainerStyle">
            {showAlert && <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
            <form className="formStyle p-2 m-2" onSubmit={handleDoctorRegistration}>
                <img src="/images/HealthEase_logo.png" alt="Logo" className="logoStyle" />
                <h3>ADD DOCTOR</h3>
                <input type="text" placeholder="First Name" className="inputStyle" value={firstName} onChange={(e) => { setFirstName(e.target.value); setFirstNameError(""); }} />
                <span className="errorStyle">{firstNameError}</span>
                <input type="text" placeholder="Last Name" className="inputStyle" value={lastName} onChange={(e) => { setLastName(e.target.value); setLastNameError(""); }} />
                <span className="errorStyle">{lastNameError}</span>
                <input type="text" placeholder="Email" className="inputStyle" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} />
                <span className="errorStyle">{emailError}</span>
                <input type="text" placeholder="Phone Number" className="inputStyle" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value); setPhoneNumberError(""); }} />
                <span className="errorStyle">{phoneNumberError}</span>
                <input type="text" placeholder="Username" className="inputStyle" value={username} onChange={(e) => { setUsername(e.target.value); setUsernameError(""); }} />
                <span className="errorStyle">{usernameError}</span>
                <input type="password" placeholder="Password" className="inputStyle" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }} />
                <span className="errorStyle">{passwordError}</span>
                <input type="text" placeholder="Address" className="inputStyle" value={address} onChange={(e) => { setAddress(e.target.value); setAddressError(""); }} />
                <span className="errorStyle">{addressError}</span>
                <div>
                <label>Department:</label>
                <select
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a department</option>
                    {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.departmentname}
                        </option>
                    ))}
                </select>
            </div>
                <Button type="submit" variant='success'>Register</Button>
            </form>
        </div>
    )
};

export default AddDoctorModal;
