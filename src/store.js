import { configureStore } from "@reduxjs/toolkit";
import { setData } from "./store/setData";
import { info } from "./store/roducer";

export const store = configureStore({
    inform: info
})