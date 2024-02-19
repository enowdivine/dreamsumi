import { configureStore } from "@reduxjs/toolkit"
import auth from "./reducers/auth"
import app from "./reducers/app"
import prodigi from "./reducers/prodigi"
import stripe from "./reducers/strpe"

const store = configureStore({
    reducer: {
        auth,
        app,
        prodigi,
        stripe
    },
})
export default store
