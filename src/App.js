import React, { useState, createContext } from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import { AuthService } from './services';
import FourteenersApp from './components/FourteenersApp/FourteenersApp';
import ErrorPage from './components/ErrorPage/ErrorPage';
import PeakContainer from './components/PeakContainer/PeakContainer';
import LoginUser from './components/LoginUser/LoginUser';
import RegisterUser from './components/RegisterUser/RegisterUser';


const authService = new AuthService();

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const context = {
        authService,
        updateService: () => setAuthContext({ ...authContext })
    };

    const [authContext, setAuthContext] = useState(context);

    return (
        <UserContext.Provider value={authContext}>
            {children}
        </UserContext.Provider>
    );
};


export default function App() {
  return (
        <AuthProvider>
            <Routes>
                <Route path='/' element={<FourteenersApp />}>
                    <Route index element={<PeakContainer />} />
                    <Route path='login' element={<LoginUser />} />
                    <Route path='register' element={<RegisterUser />} />
                    <Route path='*' element={<ErrorPage />} />
                </Route>
            </Routes>
        </AuthProvider>
  )
}
