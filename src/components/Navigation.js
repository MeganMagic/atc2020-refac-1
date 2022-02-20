import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';
import text from '../hooks/useLangSwitch'


const navList = [6, 5, 4, 3, 2]

const Navigation = ({ lang }) => {
    const [navToggle, setNavToggle] = useState(false);
    const myRef = useRef(null);
    const toggleNav = () => {
        setNavToggle(!navToggle);
        myRef.current.scrollTop = 0;
    }
    useEffect(()=>{
        if(myRef) { myRef.current.scrollTop = 0; }
    }, [])

    return(
        <div className={['navigation', navToggle ? 'navShow' : ''].join(' ')} ref={myRef}>
            <div className="title" onClick={toggleNav}>
                <div style={{marginLeft : "18px"}}>{lang==="KO"? "층별안내" : "Navigation"}</div>
                <div style={{marginRight : "18px"}}>{navToggle ? lang==="KO"? "닫기" : "close" : lang==="KO" ? "열기" : "open"}</div>
            </div>
            {navList.map((data, index) => {
                return (
                    <Link to={`/lobby/${data}`} key={index}>
                        <div className='navItem' id={`navigationLevel${data}`}>
                            <div className="floor">F{data}</div>
                            <div className="floor-info">
                                <div className="name">
                                    {text("navigation", `category${data}`, lang)}    
                                </div>
                                <div className="list">
                                    {text("navigation", `items${data}`, lang).split("\n").join(`  |  `)}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}
export default Navigation