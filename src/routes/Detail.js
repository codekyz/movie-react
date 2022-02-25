import { useEffect, useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

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
    <div className={style.container}>
      {loading ? (
        <h1 className={style.loader}>Loading...</h1>
      ) : (
        <div className={style.movie}>
          <div className={style.movie_title}>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <div className={style.movie_info}>
              <h1>{movie.title_long}</h1>
              <h3>runtime: {movie.runtime}min</h3>
              <h3>rating: {movie.rating}</h3>
            </div>
          </div>

          <div className={style.movie_discription}>
            <ul className={style.movie_genres}>
              {movie.genres.map((g) => {
                return <li key={g}>{g}</li>;
              })}
            </ul>
            <p>{movie.description_intro}</p>
          </div>
        </div>
      )}
    </div>
  );
});

export default Detail;
