import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchDepartments, fetchTests, fetchUsers } from "../services/apiServices";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [tests, setTests] = useState(null);
    const [departments, setDepartments] = useState(null);

    const [usersError, setUsersError] = useState({});
    const [testsError, setTestsError] = useState({});
    const [departmentsError, setDepartmentsError] = useState({});

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingTests, setLoadingTests] = useState(true);
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
            } catch(err) {
                setDepartmentsError({error: err, message: "Failed to fetch Departments"})
            } finally {
                setLoadingDepartments(false)
            }

            try {
                const userResponse = await fetchTests();
                setTests(userResponse.data);
            } catch (err) {
                setTestsError({error: err, message: "Failed to fetch Tests"})
            } finally {
                setLoadingTests(false);
            }
        };

        fetchData();
    }, [])

    return (
        <ApiContext.Provider value={{ users, tests, departments, usersError, testsError, departmentsError, loadingUsers, loadingTests, loadingDepartments }}>
            {children}
        </ApiContext.Provider>
    )
}