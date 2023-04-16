//components
import Header from './components/My_components'
//pages
import Home from './pages/Home';
import Drawing from './pages/Drawings';
// import { createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drawings" element={<Drawing />} />
        </Routes>
      </Router>
  );
}

export default App;
