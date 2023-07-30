import './App.css'; 
import Navbar from "./components/Navbar";  
import Footer from "./components/Footer";  
import Home from "./pages/Home";
import GetLocation from './components/GetLocation';
import findStores from './components/findStores';

import ShoppingList from './pages/ShoppingList';
import About from "./pages/About";
import SearchResult from './pages/SearchResult';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  
  const getLocation = GetLocation();
  const location = {
    lat: getLocation.coords.lat,
    lng: getLocation.coords.lng,
  };

  console.log(location.lat);
  console.log(location.lng);
  findStores(location.lat, location.lng);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/result" element={<SearchResult />} />
          <Route path="/shoppingList" element={<ShoppingList />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App; 