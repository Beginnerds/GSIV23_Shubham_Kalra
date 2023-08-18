import './App.css';
import Details from './Pages/Details/Details';
import Home from './Pages/Home/Home';

import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact Component={Home}/>
        <Route path='/details/:movieId' Component={Details}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
