import './App.css'; 
import Navbar from "./components/Navbar";  
import Footer from "./components/Footer";  
import Home from "./pages/Home";
import ShoppingList from './pages/ShoppingList';
import About from "./pages/About";
import SearchResult from './pages/SearchResult';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
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

export default App; 
