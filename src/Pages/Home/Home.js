import React, { useEffect, useState } from "react";

import styles from "./Home.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";

import { useDispatch, useSelector } from "react-redux";
import { updateMoviesList } from "../../redux/appReducer";
import { getUpcomingMoviesList } from "../../util/http";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  // redux logic
  const appData = useSelector((state) => state.app);
  // console.log("Movies stored in redux store", appData.moviesList);
  const dispatch = useDispatch();
  //dispatch(setMovieList(data))

  const [displayMoviesList, setDisplayMoviesList] = useState([]);
  const [totalMoviesLength, setTotalMoviesLength] = useState(0);
  const [searching, setSearching] = useState(false);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");


    console.log(displayMoviesList.length,totalMoviesLength);

  // for upcoming movies
  useEffect(() => {
    (async () => {
      let moviesList = await getUpcomingMoviesList(upcomingPage);
      setTotalMoviesLength(moviesList.total_results);
      moviesList = moviesList.results;
      if (displayMoviesList.length == 0) {
        setDisplayMoviesList(moviesList);
      } else {
        setDisplayMoviesList((state) => state.concat(moviesList));
      }
      // storing upcoming movies in redux store for later
      if (appData.moviesList.length == 0) {
        dispatch(updateMoviesList(moviesList));
      } else {
        dispatch(updateMoviesList([appData.moviesList].concat(moviesList)));
      }
    })();
  }, [searching, upcomingPage]);

  function fetchMore() {
    console.log("called");
    if (!searching) {
      setUpcomingPage((page) => page + 1);
    }
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={displayMoviesList.length}
        next={fetchMore}
        hasMore={displayMoviesList.length <= totalMoviesLength}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.5}
        className={styles.container}
        style={{overflow:"hidden"}}
      >
        {displayMoviesList.map((data) => {
          return (
            <MovieCard
              key={data.id}
              data-testid="movie-card-id"
              movieId={data.id}
              title={data.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              rating={data.vote_average}
              description={data.overview}
              style={{margin:"16px 8px"}}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
