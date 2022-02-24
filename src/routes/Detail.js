import { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";

const Detail = memo(() => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovie = useCallback(async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovie(json.data.movie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title_long}</h1>
          <h3>runtime:{movie.runtime}min</h3>
          <h3>{movie.rating}</h3>
          <ul>
            {movie.genres.map((g) => {
              return <li key={g}>{g}</li>;
            })}
          </ul>
          <img src={movie.large_cover_image} alt={movie.title} />
          <p>{movie.description_intro}</p>
        </div>
      )}
    </div>
  );
});

export default Detail;
