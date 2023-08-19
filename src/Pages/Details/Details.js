import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./Details.module.css";
import { getMovieCredits, getMovieDetails } from "../../util/http";
import { colors } from "../../util/colors";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Details() {
  let { movieId } = useParams();

  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState(null);
  const [creditsData, setCreditsData] = useState(null);

  // fetch movie details
  useEffect(() => {
    (async () => {
      let md = await getMovieDetails(movieId);
      let credits = await getMovieCredits(movieId);
      let cd = {};
      cd.cast = credits.cast.slice(0, 10);
      cd.cast = cd.cast.map((item) => item.name);
      cd.director = credits.crew.find(
        (item, index) => item["known_for_department"] == "Directing"
      );
      cd.director = cd.director.name;

      setMovieData(md);
      setCreditsData(cd);
      setLoading(false);
      console.log(cd);
    })();
  }, []);

  return (
    <>
    <div><SearchBar showSearchBar={false}/></div>
    <div className={styles.container}>
      {loading ? <h1>Loading...</h1> : null}
      {!loading ?
      <>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            alt="Movie Poster"
            src={`https://image.tmdb.org/t/p/w500${
              movieData.poster_path || movieData.backdrop_path
            }`}
          /></div>
          <div className={styles.movieDetailsContainer}>
            <div className={styles.titleRatingContainer}>
              <h1 className={styles.title} style={{color:colors.gray}}>{movieData.title}</h1>
              <h1 className={styles.rating} style={{color:colors.lightGray}}>{`  (${movieData.vote_average})`}</h1>
            </div>
            <div className={styles.metaDataContainer}>
                <span className={styles.metaData} style={{color:colors.red}}>
                  {`${movieData.release_date.split("-")[0]} `}
                </span>
                |{" "}
                <span className={styles.metaData} style={{color:colors.blue}}>{`0${Math.floor(
                  movieData.runtime / 60
                )}:${movieData.runtime % 60} `}</span>
                |{" "}
                <span className={styles.metaData} style={{color:colors.orchid}}>{creditsData.director}</span>
            </div>
            <p className={styles.cast} style={{color:colors.gray}}>
              <span style={{color:colors.red}}>Cast: </span> {creditsData.cast.map((name) => `${name},`)}
            </p>
            <p className={styles.description} style={{color:colors.gray}}>
              <span style={{color:colors.red}}>Description: </span> {movieData.overview}
            </p>
          </div>
        
        </>
       : null}
    </div>
    </>
  );
}
