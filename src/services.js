import axios from "axios";

// local
// const BASE_URL = 'http://localhost:3001/api/v1/';
// url of other host
const BASE_URL = 'http://localhost:5001/api/v1/';
const PEAKS_URL = BASE_URL + 'peaks';
const LOGIN_URL = BASE_URL + 'auth/login';
const GET_USER_URL = BASE_URL + 'auth/me';

// let mountains = [];

export const getAllPeaks = async () => {
    try {
        let response = await axios.get(PEAKS_URL);
        response = response.data.data.map((peak) => ({
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
        return response;
    } catch (err) {
        console.error(err);
    };
};

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
        const body = { "email": email.toLowerCase(), "password": password };
        try {
            const response = await axios.post(LOGIN_URL, body, {
                'Content-Type': 'application/json'
            });
            this.setAuthToken(response.data.token);
            this.setBearerHeader(response.data.token);
            this.setIsLoggedIn(true);
            const data = await this.getUserData();
            this.setUserData(data);
        } catch (error) {
            console.error(error)
        }
    }
}
