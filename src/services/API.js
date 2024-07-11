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

export const login = async (username, password) => {
    try {
        const response = await api.post("/auth/login", { Username: username, Password: password });
        if (response.status === 200) {
            const { token, Username } = response.data;
            localStorage.setItem("token", token);
            return { username: Username, token };
        }
    } catch (err) {
        console.error("Login Error:", err);
        throw new Error("Error logging in. Please try again later.");
    }
};

export const register = async (username, password, email, birthday) => {
    try {
        const response = await api.post("/auth/users", { Username: username, Password: password, Email: email, Birthday: birthday });
        if (response.status === 201) {
            localStorage.setItem("token", response.data.token);
            return true;
        }
    } catch (err) {
        console.error("Registration Error:", err);
        throw new Error("Error registering. Please try again later.");
    }
};

export const getAllMovies = () => api.get("/tmbd/movies");
export const searchMoviesByTitle = (searchTerm) => api.get(`/tmbd/movies/title/${searchTerm}`);
export const addFavoriteMovie = (username, movieId) =>
    api.put(`/tmbd/users/${username}/add-favorite/${movieId}`);
export const removeFavoriteMovie = (username, movieId) =>
    api.delete(`/tmbd/users/${username}/favorites/${movieId}`);
export const updateUserProfile = (username, userData) => api.put(`/auth/users/${username}`, userData);
export const getUserProfile = () => api.get("/auth/user");
export const getMovie = (movieId) => api.get(`/tmbd/movies/${movieId}`);
export const getDirector = (directorName) => api.get(`/tmbd/directors/${directorName}`);
export const getGenre = (genreName) => api.get(`/tmbd/genres/${genreName}`);
export const getFavorites = (username) => api.get(`/auth/users/${username}/favorites`);
export const deleteAccount = (username) => api.delete(`/auth/users/${username}`);
export const searchMoviesByDirector = (directorName) => api.get(`/tmbd/movies/director/${directorName}`);
export default api;