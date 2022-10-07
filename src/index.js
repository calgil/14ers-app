import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
  } from "react-router-dom";
// import FourteenersApp from './components/FourteenersApp/FourteenersApp';
// import Login, {
//   action as loginAction,
// } from "./components/LoginUser/LoginUser";
// import ErrorPage from "./components/ErrorPage/ErrorPage";
// import PeakContainer, {
//   loader as peakLoader,
// } from './components/PeakContainer/PeakContainer';
// import RegisterUser from './components/RegisterUser/RegisterUser';

  // const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <App />,
    //   // errorElement: <ErrorPage />,
    // //   action: rootAction,
    //   children: [
    //     {
    //       errorElement: <ErrorPage />,
    //       children: [
    //         { index: true, 
    //           element: <FourteenersApp />,
    //           loader: peakLoader,
    //         },
    //         {
    //           path: 'login',
    //           element: <Login />,
    //           action: loginAction,
    //         },
    //         {
    //           path: 'register',
    //           element: <RegisterUser />,
    //           // action: registerAction
    //         }
    //       ]
    //     }
    //   ],
    // },
  // ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </React.StrictMode>
);

// put react.strict back when finished

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
