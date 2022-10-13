import axios from "axios";

const BASE_URL = 'http://localhost:5001/api/v1/';
const PEAKS_URL = BASE_URL + 'peaks/';
const AUTH_URL = BASE_URL + 'auth/';
const LOGIN_URL = AUTH_URL + 'login';
const ADD_USER_URL = AUTH_URL + 'register';
const GET_USER_URL = BASE_URL + 'auth/me';
const UPDATE_USER_URL = AUTH_URL + 'updatedetails';

class User {
    constructor() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.role = '';
        this.isLoggedIn = false;
    }

    setUserEmail(email) {this.email = email; }
    setIsLoggedIn(loggedIn) { this.isLoggedIn = loggedIn; }

    setUserData(userData) {
       const { email, name, role, _id } = userData;
        this.id = _id; 
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

export class AuthService extends User {
    constructor() {
        super();
        this.authToken = '';
        this.bearerHeader = {};
    }

    logoutUser() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.role = '';
        this.isLoggedIn = false;
        this.authToken = '';
        this.bearerHeader = {};
    }

    setAuthToken(token) { this.authToken = token; }

    setBearerHeader(token) {
        this.bearerHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }

    getBearerHeader = () => this.bearerHeader;

    getUserData = async () => {
        const headers = this.getBearerHeader();
        try {
            const response = await axios.get(GET_USER_URL, { headers });
            return response.data.data
        } catch (error) {
            console.error(error);
        }
    }

    loginUser = async (email, password) => {
        const headers = this.getBearerHeader();
        const body = { "email": email.toLowerCase(), "password": password };
        try {
            const response = await axios.post(LOGIN_URL, body, { headers });
            this.setAuthToken(response.data.token);
            this.setBearerHeader(response.data.token);
            this.setIsLoggedIn(true);
            const data = await this.getUserData();
            this.setUserData(data);
        } catch (error) {
            console.error(error);
            throw error;
        };
    };

    createUser = async (name, email, password) => {
        const headers = this.getBearerHeader();
        const body = { 
            "name": name, 
            "email": email.toLowerCase(), 
            "password": password 
        };

        try {
            const response = await axios.post(ADD_USER_URL, body, { headers });
            this.setAuthToken(response.data.token);
            this.setBearerHeader(response.data.token);
            this.setIsLoggedIn(true);
            const data = await this.getUserData();
            this.setUserData(data);
        } catch (error) {
            console.error(error);
        }
    }

    editUser = async (newUserInfo) => {
        const headers = this.getBearerHeader();
        const body = newUserInfo;

        try {
            //const response =
            await axios.put(UPDATE_USER_URL, body, { headers });
            const data = await this.getUserData();
            this.setUserData(data);
        } catch (error) {
            console.error(error);
        }
    }
}


export const getAllPeaks = async () => {
    try {
        let response = await axios.get(PEAKS_URL);
        if(response.data.success){
            const peaks = response.data.data.map((peak) => ({
                id: peak._id,
                name: peak.name,
                elevation: peak.elevation,
                forest: peak.forest,
                range: peak.range,
                rank: peak.rank,
                photo: peak.photo,
                numberOfRoutes: peak.routes.length,
                routes: peak.routes
            }));
            return peaks;
        }
    } catch (err) {
        console.error(err);
        throw err;
    };
};

export const getPeakById = async (id) => {
    try {
        let response = await axios.get(`${PEAKS_URL}${id}`);
        if(response.data.success){
            const peak = response.data.data;
            return peak
    }
    } catch (error) {
        console.error(error);
        throw error;
    }
} 


