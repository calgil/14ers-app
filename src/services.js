import axios from "axios";

const BASE_URL = "http://localhost:5001/api/v1/";
const PEAKS_URL = BASE_URL + "peaks/";
const AUTH_URL = BASE_URL + "auth/";
const LOGIN_URL = AUTH_URL + "login";
const ADD_USER_URL = AUTH_URL + "register";
const GET_USER_URL = BASE_URL + "auth/me";
const UPDATE_USER_URL = AUTH_URL + "updatedetails";
const ADD_PHOTO_URL = PEAKS_URL + "uploadphoto";

class User {
  constructor() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
    this.isLoggedIn = false;
    this.peaksClimbed = [];
    //  **! climbLog
  }

  setUserEmail(email) {
    this.email = email;
  }
  setIsLoggedIn(loggedIn) {
    this.isLoggedIn = loggedIn;
  }

  setUserData(userData) {
    const { email, name, role, _id, peaksClimbed } = userData;
    this.id = _id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.peaksClimbed = peaksClimbed;
    // **! climbLog
  }
}

export class AuthService extends User {
  constructor() {
    super();
    this.authToken = "";
    this.bearerHeader = {};
  }

  logoutUser() {
    this.id = "";
    this.name = "";
    this.email = "";
    this.role = "";
    this.isLoggedIn = false;
    this.authToken = "";
    this.bearerHeader = {};
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  setBearerHeader(token) {
    this.bearerHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getBearerHeader = () => this.bearerHeader;

  getUserData = async () => {
    const headers = this.getBearerHeader();
    try {
      const response = await axios.get(GET_USER_URL, { headers });
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  loginUser = async (email, password) => {
    const headers = this.getBearerHeader();
    const body = {
      email: email.toLowerCase(),
      password: password,
    };
    try {
      const response = await axios.post(LOGIN_URL, body, { headers });
      this.setAuthToken(response.data.token);
      this.setBearerHeader(response.data.token);
      this.setIsLoggedIn(true);
      const data = await this.getUserData();
      this.setUserData(data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      console.error(error);
      throw error;
    }
  };

  createUser = async (name, email, password) => {
    const headers = this.getBearerHeader();
    const body = {
      name: name,
      email: email.toLowerCase(),
      password: password,
    };

    try {
      const response = await axios.post(ADD_USER_URL, body, { headers });
      if (response.data.success) {
        this.setAuthToken(response.data.token);
        this.setBearerHeader(response.data.token);
        this.setIsLoggedIn(true);
        const data = await this.getUserData();
        this.setUserData(data);
        return response;
      }
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      console.error(error);
    }
  };

  editUser = async (newUserInfo) => {
    const headers = this.getBearerHeader();
    const body = newUserInfo;
    console.log("body", body);

    try {
      await axios.put(UPDATE_USER_URL, body, { headers });
      const data = await this.getUserData();
      this.setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  updatePeak = async (id, data) => {
    const headers = this.getBearerHeader();
    const body = data;
    try {
      const response = await axios.put(PEAKS_URL + id, body, { headers });
      console.log("res", response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  addPeakPhoto = async (image, title) => {
    const body = new FormData();
    body.append("image", image);
    body.append("title", title);
    console.log("body", body.getAll("image"));
    try {
      let response = await axios.post(ADD_PHOTO_URL, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.authToken}`,
        },
      });
      if (response.status === 200) {
        return response.data.imagePath;
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export const getAllPeaks = async () => {
  try {
    let response = await axios.get(PEAKS_URL);
    if (response.data.success) {
      const peaks = response.data.data.map((peak) => ({
        id: peak._id,
        name: peak.name,
        elevation: peak.elevation,
        forest: peak.forest,
        range: peak.range,
        rank: peak.rank,
        photos: peak.photos,
        numberOfRoutes: peak.routes.length,
        routes: peak.routes,
      }));
      return peaks;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPeakById = async (id) => {
  try {
    let response = await axios.get(`${PEAKS_URL}${id}`);
    if (response.data.success) {
      const peak = response.data.data;
      return peak;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
