import { useEffect, useRef } from 'react'
import { Route } from 'react-router-dom';
import Level from './Level';
import '../css/Lobby.css';
import GNB from '../components/GNB';
import Navigation from '../components/Navigation';


const Lobby = () => {
    useEffect(()=>{
        console.log("Lobby CDU")
        document.body.style.overflow = "hidden";
        return () => { 
            document.body.style.color = "#191918"; 
            document.body.style.overflow = "scroll";
        };
    }, [])

    return(
        <div className="lobby">
            <Route path="/lobby/:num"><Level /></Route>
            
            <GNB />
            <Navigation />
        </div>
    )
}

export default Lobby