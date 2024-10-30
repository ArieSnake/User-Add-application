import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "./user.slice";

interface IAddUserForm {
    name: string
    salary: string
}

export const AddUser: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IAddUserForm>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data: IAddUserForm) => {
        await dispatch(addUser(data)).unwrap() 
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Name:</label>
                <input {...register('name', { required: true })} />
                {errors.name && <p>Name is required</p>}
            </div>
            <div>
                <label>Salary:</label>
                <input {...register('salary', { required: true })} type="number" />
                {errors.salary && <p>Salary is required</p>}
            </div>
            <button type="submit">Add User</button>
        </form>
    )
}