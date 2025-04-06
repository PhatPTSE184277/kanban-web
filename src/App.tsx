import React from 'react';
import './App.css';
import Routers from './routers/Routers';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './reduxs/store';

function App() {
    return (
        <>
            <Provider store={store}>
                <Routers />
                <ToastContainer />
            </Provider>
        </>
    );
}

export default App;
