import { Link } from 'react-router-dom';
import _ from 'lodash';

import '../css/GNB.css';
import logo from '../data/logo.png';

const GNB = () => {
    return(
        <div className="gnb">
            <div className="item logo">
                <img className="img" alt="logo" src={logo} />
            </div>

            <div className="item"><Link to="/about">소개</Link></div>
            <div className="item"><Link to="/level/6">관람</Link></div>
            <div className="item"><Link to="/level1">스토어</Link></div>
            <div className="item"><Link to="/people">만든 사람들</Link></div>
            
            <div className="item search">
                <input className="input" type="text"/>
                <button className="searchBtn">검색</button>
            </div>
        </div>
    )

}

export default GNB