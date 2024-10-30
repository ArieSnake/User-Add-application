import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accounts, getAllUsers } from "./user.slice";

export const Users: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector(accounts)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    const handleAddUser = () => {
        navigate('/add')
    }

    return (
        <>
            <h3>Total users are: {users.length}</h3>
            <button onClick={handleAddUser}>Add a new user</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};