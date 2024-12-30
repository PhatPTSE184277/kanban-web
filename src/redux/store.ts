import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';

const store = configureStore({
    reducer: {
        // Add reducers here
        authReducer,
    }
});

export default store;