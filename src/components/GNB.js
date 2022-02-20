import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import '../css/GNB.css';
import logo from '../data/logo.png';
import LangSwitch from './LangSwitch';
import text from '../hooks/useLangSwitch';

const svgMenu = 
    <svg version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 68 38" overflow="visible" height="20px">
        <line className="gnbMenuLine" fill="none" stroke="#161616" strokeWidth="5" strokeMiterlimit="10" x1="2.9" y1="5.1" x2="44.1" y2="5.1"/>
        <line className="gnbMenuLine" fill="none" stroke="#161616" strokeWidth="5" strokeMiterlimit="10" x1="2.9" y1="18.6" x2="44.1" y2="18.6"/>
        <line className="gnbMenuLine" fill="none" stroke="#161616" strokeWidth="5" strokeMiterlimit="10" x1="2.9" y1="32.1" x2="44.1" y2="32.1"/>
    </svg>
const svgCancel = 
    <svg version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 68 38" overflow="visible" height="20px">
        <line className="gnbMenuLine" fill="none" stroke={document.body.style.color} strokeWidth="5" strokeMiterlimit="10" x1="5.5" y1="4.1" x2="37.1" y2="32"/>
        <line className="gnbMenuLine" fill="none" stroke={document.body.style.color} strokeWidth="5" strokeMiterlimit="10" x1="5.5" y1="32" x2="37.1" y2="4.1"/>
    </svg>


const GNB = ({ backgroundColor, currentPosition, lang, setLang }) => {
    const [ show, setShow ] = useState(true);
    const [ showMenu, setShowMenu ] = useState(false);
    const menuRef = useRef(null);

    let y = window.window.scrollY;
    const debounceFunc = _.throttle((e)=>{
        const prev = y;
        y = window.window.scrollY;
        if(y - prev > 0  && y > 200) setShow(false);
        else setShow(true);
    }, 200)
    window.onscroll = (e) => debounceFunc(e);

    useEffect(()=>{
        const lines = document.querySelectorAll('.gnbMenuLine');
        if(lines && lines.length > 0){
            lines.forEach((item) => item.style.stroke = document.body.style.color );
        }
    }, [])
    useEffect(()=>{
        const lines = document.querySelectorAll('.gnbMenuLine');
        if(lines && lines.length > 0){
            lines.forEach((item) => item.style.stroke = document.body.style.color );
        }
    }, [showMenu]);

    return(
        <>
        <div className={`gnb ${show?'':'gnb-show'}`} style={{backgroundColor:backgroundColor}}>
            <div className="current">
                <div>{currentPosition}</div>
            </div>

            <div className="gnb-flex-row-wrapper" style={{width : "100%"}}>
                <div className="gnbItem logo">
                    <Link to="/">
                        <img className="img" alt="logo" src={logo} />
                    </Link>
                </div>
                <div className="gnbItem menu gnb-flex-row-wrapper" >
                    <div className="text" style={{marginRight : "10px", lineHeight:"0"}}>menu</div>
                    <div className="icon" onClick={(e) => setShowMenu(!showMenu)}>
                        {showMenu ? svgCancel : svgMenu }
                    </div>
                </div>
            </div>

            <div className={['gnbMenu', showMenu ? '' : 'menu-hide'].join(' ')} ref={menuRef} style={{backgroundColor : backgroundColor}}>
                <Link to="/about">
                    <div className="menuItem" style={{paddingTop : "4vh"}}>
                        {text("gnb", "aboutATC", lang)}
                    </div>            
                </Link>
                <Link to="/lobby/6">
                    <div className="menuItem" onClick={() => setShowMenu(false)}>
                        {text("gnb", "exhibition", lang)}
                    </div>
                </Link>
                <Link to="/level1">
                    <div className="menuItem" >
                        {text("gnb", "store", lang)}
                    </div>
                </Link>
                <Link to="/credit">
                    <div className="menuItem" >
                        {text("gnb", "credit", lang)}
                    </div>
                </Link>
                <div className="lang menuItem " style={{display:"flex", alignItems:"flex-start"}}>
                        {lang==="KO" ? "언어" : "Language"}
                        <LangSwitch lang={lang} setLang={setLang} setShowMenu={setShowMenu}/>
                    </div>
            </div>
            
        </div>
        
        </>
    )

}

export default GNB