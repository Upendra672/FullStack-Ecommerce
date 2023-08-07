import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import Home from "./component/Home/Home.jsx";


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);



  return (
    <Router>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
   </Routes>
   <Footer/>
    </Router>
  );
}

export default App;
