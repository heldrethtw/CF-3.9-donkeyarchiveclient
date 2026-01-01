import axios from "axios";
const BASE_URL = "https://donkey-archive-af41e8314602.herokuapp.com/api";

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Helper function to extract user-friendly error messages
const getErrorMessage = (error, defaultMessage) => {
    if (error.response) {
        // Server responded with an error status
        const status = error.response.status;
        const serverMessage = error.response.data?.message || error.response.data?.error;

        switch (status) {
            case 400:
                return serverMessage || "Invalid request. Please check your input and try again.";
            case 401:
                return "Authentication failed. Please log in again.";
            case 403:
                return "You don't have permission to perform this action.";
            case 404:
                return serverMessage || "The requested resource was not found.";
            case 409:
                return serverMessage || "This resource already exists.";
            case 500:
                return "Server error. Please try again later.";
            default:
                return serverMessage || defaultMessage;
        }
    } else if (error.request) {
        // Request was made but no response received
        return "Network error. Please check your internet connection and try again.";
    } else {
        // Error in setting up the request
        return error.message || defaultMessage;
    }
};

export const login = async (username, password) => {
    try {
        if (!username || !password) {
            throw new Error("Username and password are required.");
        }

        const response = await api.post("/auth/login", { Username: username, Password: password });
        if (response.status === 200) {
            const { token, Username } = response.data;
            localStorage.setItem("token", token);
            return { username: Username, token };
        }
    } catch (err) {
        console.error("Login Error:", err);
        throw new Error(getErrorMessage(err, "Error logging in. Please try again later."));
    }
};

export const register = async (username, password, email, birthday) => {
    try {
        if (!username || !password || !email) {
            throw new Error("Username, password, and email are required.");
        }

        const response = await api.post("/auth/users", { Username: username, Password: password, Email: email, Birthday: birthday });
        if (response.status === 201) {
            localStorage.setItem("token", response.data.token);
            return true;
        }
    } catch (err) {
        console.error("Registration Error:", err);
        throw new Error(getErrorMessage(err, "Error registering. Please try again later."));
    }
};

export const getAllMovies = async () => {
    try {
        const response = await api.get("/tmbd/movies");
        return response;
    } catch (err) {
        console.error("Error fetching all movies:", err);
        throw new Error(getErrorMessage(err, "Error fetching movies. Please try again later."));
    }
};

export const searchMoviesByTitle = async (searchTerm) => {
    try {
        if (!searchTerm || searchTerm.trim() === "") {
            throw new Error("Please enter a movie title to search.");
        }

        const response = await api.get(`/tmbd/movies/title/${searchTerm}`);
        return response;
    } catch (err) {
        console.error("Error searching movies by title:", err);
        throw new Error(getErrorMessage(err, "Error searching for movies. Please try again later."));
    }
};

export const addFavoriteMovie = async (username, movieId) => {
    try {
        if (!username || !movieId) {
            throw new Error("Username and movie ID are required to add a favorite.");
        }

        const response = await api.put(`/tmbd/users/${username}/add-favorite/${movieId}`);
        return response;
    } catch (err) {
        console.error("Error adding favorite movie:", err);
        throw new Error(getErrorMessage(err, "Error adding movie to favorites. Please try again later."));
    }
};

export const removeFavoriteMovie = async (username, movieId) => {
    try {
        if (!username || !movieId) {
            throw new Error("Username and movie ID are required to remove a favorite.");
        }

        const response = await api.delete(`/tmbd/users/${username}/favorites/${movieId}`);
        return response;
    } catch (err) {
        console.error("Error removing favorite movie:", err);
        throw new Error(getErrorMessage(err, "Error removing movie from favorites. Please try again later."));
    }
};

export const updateUserProfile = async (username, userData) => {
    try {
        if (!username) {
            throw new Error("Username is required to update profile.");
        }
        if (!userData || Object.keys(userData).length === 0) {
            throw new Error("Profile data is required to update.");
        }

        const response = await api.put(`/auth/users/${username}`, userData);
        return response;
    } catch (err) {
        console.error("Error updating user profile:", err);
        throw new Error(getErrorMessage(err, "Error updating profile. Please try again later."));
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get("/auth/user");
        return response;
    } catch (err) {
        console.error("Error fetching user profile:", err);
        throw new Error(getErrorMessage(err, "Error fetching profile data. Please try again later."));
    }
};

export const getMovie = async (movieId) => {
    try {
        if (!movieId) {
            throw new Error("Movie ID is required.");
        }

        const response = await api.get(`/tmbd/movies/${movieId}`);
        return response;
    } catch (err) {
        console.error("Error fetching movie:", err);
        throw new Error(getErrorMessage(err, "Error fetching movie details. Please try again later."));
    }
};

export const getDirector = async (directorName) => {
    try {
        if (!directorName || directorName.trim() === "") {
            throw new Error("Director name is required.");
        }

        const response = await api.get(`/tmbd/directors/${directorName}`);
        return response;
    } catch (err) {
        console.error("Error fetching director:", err);
        throw new Error(getErrorMessage(err, "Error fetching director information. Please try again later."));
    }
};

export const getGenre = async (genreName) => {
    try {
        if (!genreName || genreName.trim() === "") {
            throw new Error("Genre name is required.");
        }

        const response = await api.get(`/tmbd/genres/${genreName}`);
        return response;
    } catch (err) {
        console.error("Error fetching genre:", err);
        throw new Error(getErrorMessage(err, "Error fetching genre information. Please try again later."));
    }
};

export const getFavorites = async (username) => {
    try {
        if (!username) {
            throw new Error("Username is required to fetch favorites.");
        }

        const response = await api.get(`/auth/users/${username}/favorites`);
        return response;
    } catch (err) {
        console.error("Error fetching favorites:", err);
        throw new Error(getErrorMessage(err, "Error fetching favorite movies. Please try again later."));
    }
};

export const deleteAccount = async (username) => {
    try {
        if (!username) {
            throw new Error("Username is required to delete account.");
        }

        const response = await api.delete(`/auth/users/${username}`);
        return response;
    } catch (err) {
        console.error("Error deleting account:", err);
        throw new Error(getErrorMessage(err, "Error deleting account. Please try again later."));
    }
};

export const searchMoviesByDirector = async (directorName) => {
    try {
        if (!directorName || directorName.trim() === "") {
            throw new Error("Director name is required to search.");
        }

        const response = await api.get(`/tmbd/movies/director/${directorName}`);
        return response;
    } catch (err) {
        console.error("Error searching movies by director:", err);
        throw new Error(getErrorMessage(err, "Error searching for director's movies. Please try again later."));
    }
};

export default api;