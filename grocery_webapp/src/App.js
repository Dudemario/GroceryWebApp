import './App.css'; 
import Navbar from "./components/Navbar";  
import Footer from "./components/Footer";  
import Home from "./pages/Home";

import ShoppingList from './pages/ShoppingList';
import About from "./pages/About";
import SearchResult from './pages/SearchResult';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/results/:query" element={<SearchResult />} />
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