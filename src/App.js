import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import {useEffect, useState} from "react";
import {navItems} from "./utils/constants";
import {useNavigate} from "react-router-dom";

function App() {
    const [currentPage, setCurrentPage] = useState(navItems[0]);
    // const  navigate = useNavigate();
    //
    // useEffect(() =>{
    //     navigate(JSON.parse(sessionStorage.getItem('lastRoute') || '{}'))
    //     window.onbeforeunload = () => {
    //         window.sessionStorage.setItem('lastRoute', JSON.stringify(window.location.pathname))
    //     }
    // }, [])
    return (
        <>
            <Header changePage={setCurrentPage}/>
            <Main currentPage={currentPage}/>
            <Footer/>
        </>
    );
}

export default App;
