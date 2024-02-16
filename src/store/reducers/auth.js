import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_API_VERSION}/user`


const initialState = {
    user: null,
}

export const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
    try {
        const response = await axios.post(`${url}/signup`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.data) {
        }
        return response.data
    } catch (error) {
        const message =
            (error.message && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        const response = await axios.post(`${url}/login`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.data) {
            localStorage.setItem(
                "dreamsumiai-user",
                JSON.stringify(response.data.token)
            )
            localStorage.setItem(
                "dreamsumiai-usercredit",
                JSON.stringify(response.data.credit)
            )
        }
        return response.data
    } catch (error) {
        const message =
            (error.message && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateDetails = createAsyncThunk(
    "auth/updateDetails",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(
                `${url}/update`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${data.userToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            if (response.data) {
                localStorage.setItem(
                    "dreamsumiai-user",
                    JSON.stringify(response.data.token)
                )
            }
            return response.data
        } catch (error) {
            const message =
                (error.message && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: state => {
            state.user = null
            localStorage.removeItem("dreamsumiai-user")
        },
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.token
        })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
