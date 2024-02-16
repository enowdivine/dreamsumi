import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_API_VERSION}/ai`
const token = JSON.parse(localStorage.getItem("dreamsumiai-user"));

const initialState = {}

export const generateImage = createAsyncThunk("app/generateImage", async (prompt, thunkAPI) => {
    try {
        const response = await axios.post(`${url}/generate`, { prompt }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        return response.data
    } catch (error) {
        const message =
            (error.message && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const checkProgress = createAsyncThunk("app/checkProgress", async (jobId, thunkAPI) => {
    try {
        const response = await axios.get(`${url}/progress/${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        const message =
            (error.message && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const upscaleImage = createAsyncThunk("auth/upscaleImage",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${url}/upscale`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
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

export const variateImage = createAsyncThunk("auth/variateImage",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${url}/variate`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
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

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {},
    extraReducers: builder => { },
})

// export const { } = appSlice.actions

export default appSlice.reducer
