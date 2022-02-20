import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom';
import Level from './Level';
import '../css/Lobby.css';
import GNB from '../components/GNB';
import Navigation from '../components/Navigation';
import text from '../hooks/useLangSwitch';


const Lobby = ({ lang, setLang }) => {
    const [ level, setLevel ] = useState(6);

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return () => { 
            document.body.style.color = "#191918"; 
            document.body.style.overflow = "scroll";
        };
    }, [])


    return(
        <div className="lobby">
            <Route path="/lobby/:num">
                <Level lang={lang} setLobbyLevel={setLevel}/>
            </Route>
            
            <GNB 
                backgroundColor="white"
                lang={lang} setLang={setLang} 
                currentPosition={ level + text("lobby", "currentPosition", lang)}
            />
            <Navigation lang={lang}/>
        </div>
    )
}

export default Lobby