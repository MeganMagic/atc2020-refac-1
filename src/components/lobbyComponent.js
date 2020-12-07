import { Link } from 'react-router-dom';
import nextLevel from '../data/stairway.jpg';
import picFrame from '../data/picFrame.svg';

import { Fragment } from 'react';


const lobbyComponent = {
    head : (key, title, desc) => (
        <li className="item-text item-title" key={key}>
            <div className="title">{title}</div>
            <div className="desc">{desc}</div>
        </li>
    ),
    sub : (key, title, desc, color) => (
        <Fragment>
        <li style={{height:"100vh", width:"1px", backgroundColor:color, marginRight:"120px"}}></li>
        <li className="item-text item-sub" key={key}>
            <svg version="1.1" className="subTitleLine" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.9 17" overflow="visible" width="120px">
                <path id="zigzag" fill="none" stroke={color} strokeWidth="2.5003" strokeMiterlimit="4.0005" d="M0.8,14.3L16.5,2.8l8.3,11.4L40.6,2.8l8.2,11.3L64.7,2.6L73,14L88.7,2.6l8.2,11.3l15.8-11.5l8.3,11.4"/>
            </svg>

            <div className="title">{title}</div>
            <div className="desc">{desc}</div>
        </li>
        </Fragment>
    ),
    // entrance : (key, level, workID, title, desc, thumbnail) => (
    //     <li className="item-entrance" key={key} id={workID}>
    //         <Link to={`/gallery/${level}/${workID}`}>
    //             <div className="flex-row-wrapper">
    //                 {/* <img className="thumbnail" alt="thumbnail" src={thumbnail}/> */}
    //                 <div className="thumbnail" style={{backgroundImage:`url(${thumbnail})`}}>
    //                     {/* <div className="innerFrame"></div> */}
    //                     <img className="picFrame" alt="frame" src={picFrame} />
    //                 </div>

    //                 <div className="info">
    //                     <div className="title">{title}</div>
    //                     <div className="desc">{desc}</div>
    //                 </div>
    //             </div>
    //         </Link>
    //     </li>
    // )
    entrance : (key, level, workID, title, desc, thumbnail) => (
        <li className="item-entrance" key={key} id={workID}>
            <Link to={`/gallery/${level}/${workID}`}>
                
                <div className="flex-row-wrapper-TEMP">

                    <div className="thumbnail-TEMP" style={{backgroundImage:`url(${thumbnail})`}}>
                    </div>

                    <div className="info-TEMP">
                        
                        <div className="title">{title}</div>
                        <div className="desc">{desc}</div>
                    </div>

                </div>
            </Link>
        </li>
    )
}


export default lobbyComponent