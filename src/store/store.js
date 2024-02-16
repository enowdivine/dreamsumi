import { configureStore } from "@reduxjs/toolkit"
import auth from "./reducers/auth"
import app from "./reducers/app"
import prodigi from "./reducers/prodigi"

const store = configureStore({
    reducer: {
        auth,
        app,
        prodigi
    },
})
export default store
