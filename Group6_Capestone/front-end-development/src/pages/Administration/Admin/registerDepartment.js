import { useState } from "react";
import Menu from "../../../components/Menu";
import { useMutation } from "@apollo/client";
import { REGISTER_DEPARTMENT } from "../../../graphql/middleware";

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
            // Optionally, you can reset the departmentName state after successful registration
            setDepartmentName('');
        } catch (error) {
            console.error('Error registering department:', error.message);
            // Handle error state or notify user
        }
    };

    return (
        <div>
            <Menu />
            <div className="mt-5 text-center">
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
        </div>
    );
}
