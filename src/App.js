import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import {useState} from "react";
import {navItems} from "./utils/constants";

function App() {
    const [currentPage, setCurrentPage] = useState(navItems[0]);
    return (
        <>
        <Header changePage={setCurrentPage}/>
        <Main currentPage={currentPage}/>
        <Footer/>
        </>
    );
}

export default App;
