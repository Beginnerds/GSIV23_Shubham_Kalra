import { screen, render, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store";

const MockHome = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

describe("Home", () => {
  it("should render multiple movie cards on render", async () => {
    render(<MockHome />);
    const movieCardElements = await screen.findAllByTestId("movie-card");
    // at least 5 movie cards were rendered
    expect(movieCardElements.length).toBeGreaterThan(5);
  });

  it("should be present in the doucment",()=>{
    render(<MockHome/>);
    const searchBarElement = screen.getByPlaceholderText("Search");

    expect(searchBarElement).toBeInTheDocument();
  })

  it("should display the input in search bar",async()=>{
    render(<MockHome/>);
    const searchBarElement = screen.getByPlaceholderText("Search");

    fireEvent.change(searchBarElement,{
        target:{
            value:"hulk"
        }
    });

    expect(searchBarElement.value).toBe("hulk");
  })
});
