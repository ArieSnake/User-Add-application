import axios from "axios";
import { createAppSlice } from "../../app/createAppSlice";
import {IUser, IUSerState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IUSerState = {
    accounts: []
}

export const userSlice = createAppSlice({
    name:"users",
    initialState,
    reducers:create => ({
        getAllUsers:create.asyncThunk(
            async() => {
                const response = await axios.get<IUser[]>("http://localhost:3004/users")
                return response.data
            },
            {
                fulfilled: (state, action: PayloadAction<IUser[]>) => {
                    state.accounts = action.payload
                },
            }

        ),
        addUser: create.asyncThunk(
            async (user: Omit<IUser, 'id'>) => {
                const response = await axios.get<IUser[]>("http://localhost:3004/users");
                const users = response.data;
                const maxId = Math.max(...users.map(u => parseInt(u.id)));
                const newUser = { ...user, id: (maxId + 1).toString() };
                const result = await axios.post<IUser>("http://localhost:3004/users", newUser);
                return result.data;
            },
            {
                fulfilled: (state, action: PayloadAction<IUser>) => {
                    state.accounts.push(action.payload)
                },
            }
        ),
    }),
    selectors: {
        accounts: (state: IUSerState) => state.accounts,
        accountCount: (state: IUSerState) => state.accounts.length
    },
})

export const { accounts, accountCount } = userSlice.selectors
export const { getAllUsers, addUser } = userSlice.actions