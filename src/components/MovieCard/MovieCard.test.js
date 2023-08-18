import { screen, render } from "@testing-library/react";
import MovieCard from "./MovieCard";
import { BrowserRouter } from "react-router-dom";

const MockMovieCard = (props) => {
  return (
    <BrowserRouter>
      <MovieCard {...props} />
    </BrowserRouter>
  );
};

describe("MovieCard", () => {

  // check if movie card is rendering without the movie id  
  it("should not be rendered if no movie id is provided", () => {
    render(<MockMovieCard/>);
    const movieCardElement = screen.queryByTestId("movie-card");

    expect(movieCardElement).not.toBeInTheDocument();
  });

  // check if title is displaying correctly
  it("should display the movie title when passed correct props", () => {
    render(<MockMovieCard movieId="123" title="Title" />);
    const heading = screen.getByTestId("title");

    expect(heading.textContent).toBe("Title");
  });

  // check if title is displaying correctly
  it("should display the movie rating when passed correct props", () => {
    render(<MockMovieCard movieId="123" rating="9.2" />);
    const ratingElement = screen.getByTestId("rating");

    expect(ratingElement.textContent).toBe("(9.2)");
  });
});
