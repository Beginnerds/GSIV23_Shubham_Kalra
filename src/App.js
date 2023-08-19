import "./App.css";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home/Home";
import store from "./redux/store";
import { Provider } from "react-redux";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/details/:movieId" Component={Details} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
