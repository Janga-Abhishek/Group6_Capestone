import { useState } from "react";
import Menu from "../../../components/Menu";
import { useMutation } from "@apollo/client";
import { REGISTER_DEPARTMENT } from "../../../graphql/middleware";
import '../../../Stylesheet/RegisterDepartment.css'
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 


export default function RegisterDepartment() {
    const [departmentName, setDepartmentName] = useState('');
    const [registerDepartment] = useMutation(REGISTER_DEPARTMENT);

    const handleDepartmentRegistration = async (e) => {
        e.preventDefault();
        try {
            const { data } = await registerDepartment({
                variables: {
                    departmentname: departmentName
                }
            });
            console.log('Department registered:', data.RegisterDepartment);
            toast.success('Department has been successfully registered!', { position:"bottom-center" });
            setDepartmentName('');
        } catch (error) {
            console.error('Error registering department:', error.message);
            toast.error('Error registering department: ' + error.message, { position:"bottom-center" });
        }
    };

    return (
        <div>
            <Menu />
            <div className="department-container text-center w-50 mx-auto">
                <h1>Register Department</h1>
                <form onSubmit={handleDepartmentRegistration}>
                    <input
                        type="text"
                        placeholder="Department Name"
                        className="inputStyle"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary mt-3">
                        Register Department
                    </button>
                </form>
            </div>
            <ToastContainer className="w-50" />
        </div>
    );
}
