import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchDepartments, fetchUsers } from "../services/apiServices";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [usersError, setUsersError] = useState({});
    const [departmentsError, setDepartmentsError] = useState({});

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingDepartments, setLoadingDepartments] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const userResponse = await fetchUsers();
                setUsers(userResponse.data);
            } catch (err) {
                setUsersError({error: err, message: "Failed to fetch Users"})
            } finally {
                setLoadingUsers(false);
            }

            try {
                const response = await fetchDepartments();
                setDepartments(response.data)
            } catch(error) {
                setDepartmentsError({error: err, message: "Failed to fetch Departments"})
            } finally {
                setLoadingDepartments(false)
            }
        };

        fetchData();
    }, [])

    return (
        <ApiContext.Provider value={{ users, departments, usersError, departmentsError, loadingUsers, loadingDepartments }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => useContext(ApiContext);