import react, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieView = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://donkey-archive-af41e8314602.herokuapp.com /api/tmbd/movies/title/${title}`
        );
        setMovie(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://donkey-archive-af41e8314602.herokuapp.com/api/users/${localStorage.getItem(
          "user"
        )}/movies/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Movie added to favorites!");
    } catch (error) {
      alert("Error adding movie to favorites");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie: {error.message}</div>;

  return (
    <div>
      <div>{movie.Title}</div>
      <div>{movie.Description}</div>
      <div>
        <strong>Genre</strong>
        {movie.Genre}
      </div>
      <div>
        <strong>Director</strong>
        {movie.Director}
      </div>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default MovieView;
