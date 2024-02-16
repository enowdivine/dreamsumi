import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_API_VERSION}/print`
const token = JSON.parse(localStorage.getItem("dreamsumiai-user"));

const initialState = {}

export const getOrders = createAsyncThunk("prodigi/getOrders", async (thunkAPI) => {
    try {
        const response = await axios.get(`${url}/get_orders`, {
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


export const prodigiSlice = createSlice({
    name: "prodigi",
    initialState,
    reducers: {},
    extraReducers: builder => { },
})
export default prodigiSlice.reducer
