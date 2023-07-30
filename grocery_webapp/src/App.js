import './App.css'; 
import Navbar from "./components/Navbar";  
import Footer from "./components/Footer";  
import Home from "./pages/Home";
import About from "./pages/About";
import SearchResult from './pages/SearchResult';
import ShoppingList from './pages/shoppingList'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<SearchResult/>} />
        <Route path="/shoppingList" exact element={<ShoppingList/>}/>
        <Route path="/about" exact element={<About/>}/>
        <Route path="/result" exact element={<Home/>}/>
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App; 
