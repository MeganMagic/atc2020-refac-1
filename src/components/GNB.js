import { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import '../css/GNB.css';
import logo from '../data/logo.png';

const GNB = ({ color }) => {
    const [ show, setShow ] = useState(true);
    let y = window.window.scrollY;
    const debounceFunc = _.throttle((e)=>{
        const prev = y;
        y = window.window.scrollY;
        if(y - prev > 0  && y > 200) setShow(false);
        else setShow(true);
    }, 200)
    window.onscroll = (e) => debounceFunc(e);

    return(
        <div className={`gnb ${show?'':'gnb-show'}`} style={{backgroundColor:color}}>
            <div className="item logo">
                <Link to="/">
                    <img className="img" alt="logo" src={logo} />
                </Link>
            </div>

            <div className="item"><Link to="/about">소개</Link></div>
            <div className="item"><Link to="/lobby/6">관람</Link></div>
            <div className="item"><Link to="/level1">스토어</Link></div>
            <div className="item"><Link to="/credit">만든 사람들</Link></div>
            
            <div className="item search" style={{width:"100px"}}>
                {/* <input className="input" type="text"/> */}
                <button className="searchBtn">검색</button>
            </div>
        </div>
    )

}

export default GNB