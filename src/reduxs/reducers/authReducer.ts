import { createSlice } from '@reduxjs/toolkit';
import { localDataNames } from '../../constants/appInfos';

export interface AuthState {
    token: String;
    _id: String;
    name: String;
    rule: Number;
}

const initialState = {
    token: '',
    _id: '',
    name: '',
    rule: 0
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.data = action.payload;
            syncLocal(action.payload);
        },
        removeAuth: (state, _action) => {
            state.data = initialState;
            syncLocal({});
        },
        refeshToken: (state, action) => {
            state.data.token = action.payload;
        }
    }
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, refeshToken } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.data;

const syncLocal = (data: any) => {
    localStorage.setItem(localDataNames.authData, JSON.stringify(data));
};
