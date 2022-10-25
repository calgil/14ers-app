import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthService } from "./services";
import FourteenersApp from "./components/FourteenersApp/FourteenersApp";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import PeakContainer from "./components/PeakContainer/PeakContainer";
import UserLogin from "./components/UserLogin/UserLogin";
import UserRegister from "./components/UserRegister/UserRegister";
import UserEdit from "./components/UserEdit/UserEdit";
import UserLogout from "./components/UserLogout/UserLogout";
import PeakDetails from "./components/PeakDetails/PeakDetails";
import PeakEdit from "./components/PeakEdit/PeakEdit";
import Planning from "./components/Planning/Planning";
import TripReports from "./components/TripReports/TripReports";

const authService = new AuthService();

export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    updateAuth: () => setAuthContext({ ...authContext }),
  };

  const [authContext, setAuthContext] = useState(context);

  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<FourteenersApp />}>
          <Route index element={<PeakContainer />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<UserRegister />} />
          <Route path="edit" element={<UserEdit />} />
          <Route path="logout" element={<UserLogout />} />
          <Route path="/peaks/:id" element={<PeakDetails />} />
          <Route path="/peaks/edit/:id" element={<PeakEdit />} />
          <Route path="planning" element={<Planning />} />
          <Route path="tripreports" element={<TripReports />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
