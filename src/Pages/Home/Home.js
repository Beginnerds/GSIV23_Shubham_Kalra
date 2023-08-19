import React, { useEffect, useState } from "react";

import styles from "./Home.module.css";
import MovieCard from "../../components/MovieCard/MovieCard";

import { useDispatch, useSelector } from "react-redux";
import { updateMoviesList } from "../../redux/appReducer";
import { getUpcomingMoviesList, searchMoviesList } from "../../util/http";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  // redux logic
  const appData = useSelector((state) => state.app);
  const dispatch = useDispatch();
  //dispatch(setMovieList(data))

  const [totalMoviesLength, setTotalMoviesLength] = useState(0);
  const [searching, setSearching] = useState(false);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

//   console.log(searching, searchQuery, searchPage, appData.moviesList.length);

  // for upcoming movies
  useEffect(() => {
    (async () => {
      let moviesList;

      if (searching) {
        moviesList = await searchMoviesList(searchQuery, searchPage);
      } else {
        moviesList = await getUpcomingMoviesList(upcomingPage);
      }

      setTotalMoviesLength(moviesList.total_results);
      moviesList = moviesList.results;

      if (appData.moviesList.length == 0) {
        dispatch(updateMoviesList(moviesList));
      } else {
        dispatch(updateMoviesList(appData.moviesList.concat(moviesList)));
      }
    })();
  }, [searching, upcomingPage, searchPage, searchQuery]);

  function fetchMore() {
    console.log("called");
    if (!searching) {
      setUpcomingPage((page) => page + 1);
    } else {
      setSearchPage((page) => page + 1);
    }
  }

  function onSearchQueryChange(value) {
    setSearchQuery(value);
    setSearchPage(1);
    dispatch(updateMoviesList([]));

    if (value.trim().length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
      setUpcomingPage(1);

    }
  }

  return (
    <div>
      <SearchBar setQuery={onSearchQueryChange} />
      <InfiniteScroll
        dataLength={appData.moviesList.length}
        next={fetchMore}
        hasMore={appData.moviesList.length <= totalMoviesLength}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Fetched all movies</b>
          </p>
        }
        scrollThreshold={0.5}
        className={styles.container}
        style={{ overflow: "hidden" }}
      >
        {appData.moviesList.map((data) => {
          return (
            <MovieCard
              key={data.id}
              data-testid="movie-card-id"
              movieId={data.id}
              title={data.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${data.poster_path || data.backdrop_path || 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg'}`}
              rating={data.vote_average}
              description={data.overview}
              style={{ margin: "16px 8px" }}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
