/*import './App.css'; 
import Navbar from "./components/Navbar";  
import Footer from "./components/Footer";  
import Home from "./pages/Home";
import ShoppingList from './pages/ShoppingList';
import About from "./pages/About";
import SearchResult from './pages/SearchResult';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

function App() {

  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <div className="App">
    <Router>
      <Navbar currentPage={currentPage}/>
      <Routes>
        <Route path="/result" exact element={<SearchResult/>} />
        <Route path="/shoppingList" exact element={<ShoppingList/>}/>
        <Route path="/about" exact element={<About/>}/>
        <Route path="/" exact element={<Home/>}/>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App; */
import './App.css'; 
import Navbar from "./components/Navbar";  
import Footer from "./components/Footer";  
import Home from "./pages/Home";
import ShoppingList from './pages/ShoppingList';
import About from "./pages/About";
import SearchResult from './pages/SearchResult';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Main />
        <Footer />
      </Router>
    </div>
  );
}

function Main() {
  // Use useLocation hook inside the Main component
  const location = useLocation();
  const currentPage = location.pathname;
  
  return (
    <>
      <Navbar currentPage={currentPage} />
      <Routes>
        <Route path="/result" element={<SearchResult />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App; 