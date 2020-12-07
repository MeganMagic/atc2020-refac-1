import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../css/Home.css'

import poster from '../data/homePoster.jpg'
import HLine from '../components/HLine';
import go from '../data/go.svg';

const Home = () => {
    const titlePC = 
        `ART&
        TECHNOLOGY
        CONFERENCE
        2020`;
    const titleTablet = 
        `ART&TECHNOLOGY
        CONFERENCE 2020
    `;
    let width = document.documentElement.clientWidth;

    const [ title, setTitle ] = useState(width > 1024? titlePC : titleTablet);
    const throttleFunc = _.throttle(()=>{
        width = document.documentElement.clientWidth;
        setTitle(width > 1024? titlePC : titleTablet)
    }, 200);
    window.onresize = (e) => throttleFunc();

    //cdm
    useEffect(()=>{
        document.body.style.color = "#161616";
        document.body.style.backgroundColor = "white";
    }, [])

    return(
        <div className="home">
            <div className="wrapper poster">
                <div className="image" style={{backgroundImage:`url(${poster})`}}></div>
                <HLine color="black" border={3} />
            </div>


            <div className="flex-row-wrapper">
                <div className="section title">
                    {title}
                </div>

                {width > 1024? '' : <HLine color="black" border={3} />}

                <div className="section menu">
                    <Link to="/lobby/6">
                        <div className="item go">
                            <div>관람하기</div>
                            <svg className="icon" version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 57.3 36.8" overflow="visible" height="40px">
                                <g>
                                    <line className="line" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" y1="19.4" x2="50.8" y2="19.4"/>
                                    <polyline className="line"fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" points="39,7.5 50.8,19.4 39,31.2 	"/>
                                </g>
                            </svg>
                        </div>
                    </Link>
                    {width > 1024? <HLine color="black" border={3} /> : ''}
                    {width > 1024? 
                        <div className="flex-responsive-wrapper">
                            <Link to="/about">
                                <div className="item" >전시 소개</div>
                            </Link>
                            <Link to="/credit">
                                <div className="item">만든 사람들</div>
                            </Link>
                            <Link to="/level1">
                                <div className="item">방명록 & 스토어</div>
                            </Link>
                        </div>
                        : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default Home