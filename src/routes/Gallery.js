
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import '../css/Gallery.css';

import GNB from '../components/GNB'
import item from '../components/galleryComponent';
import Artist from '../components/Artist';
import HLine from '../components/HLine';
import Loading from '../components/Loading';
import text from '../hooks/useLangSwitch';
import Error from '../routes/Error';

import useAxiosAll from '../hooks/useAxiosAll';



//temp setting

const colorArray = [ null, null, "#161616", "#CC6865", "#4386B7", "#518C31", "#C0653E"];

const Gallery = ({ lang, setLang }) => {
    const { num, workID } = useParams();
    const urls = [`https://docs.google.com/spreadsheets/d/1lW9xsfxeghuknmVyrVNrkD9o-E9H4AbYiYy4dQ0aRCI/gviz/tq?tq=SELECT+A%2c+C%2c+E%2c+F%2c+G%2c+I%2c+J%2c+K+WHERE+B%3d%22${workID}%22&sheet=${lang}`, `https://docs.google.com/spreadsheets/d/1pyAsDTCxzieDew0aZLHhIQpAgG6smwTqhGy3kcvE5n4/gviz/tq?tq=SELECT+B%2c+C%2c+D%2c+E+WHERE+A%3d%22${workID}%22&sheet=${lang}`];
    const tables = ["worksInfoForGallery", "worksDetail"]
    const { loading, error, data, refetch } = useAxiosAll( urls, tables, axios );
    
    const [ width, setWidth ] = useState(document.body.clientWidth > 1440? 1240 : document.body.clientWidth-200);
    const throttleResize = _.throttle(()=>{
        setWidth(document.body.clientWidth > 1440?  1240 : document.body.clientWidth-200);
    }, 200);
    window.onresize = (e) => throttleResize();

    //cdm
    useEffect(()=>{
        window.scrollTo(0, 0);
        document.body.style.color = colorArray[num];
        document.body.style.overflow = "scroll";
    }, [])
    //cdu, by lang
    useEffect(()=>{
        refetch();
    }, [lang]);

    if(loading) return <Loading  width="100vw" height="100vh"/>
    if(error) return <Error />

    const element = (
        <div className="gallery main">
            <div className="section intro">
                <div className="title">{data[0][0].title}</div>
                <div className="desc">
                    <div className="info">
                        <div>{data[0][0].teamName}</div>
                        <div>{data[0][0].genre}</div>
                    </div>
                    <div className="text">{data[0][0].detailDesc}</div>
                </div>
                {
                    data[0][0].archiving === '-' ? '' :
                    <iframe title="archiving video" className="video" width={width} height={width*0.5625} src={data[0][0].archiving} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
                }
            </div>

            <HLine color={colorArray[num]} border={3}/>
            <div className="section detail">
                <div className="title">
                    {text("gallery", "detail", lang)}
                </div>
                <div className="wrapper"> 
                    {data[1].map((data, index) => {
                        if(data.type === "text"){ return item.text(index, data.source) }
                        else if (data.type === "image"){ return item.image(index, data.source) }
                        else if (data.type === "video"){ return item.video(index, data.source, width) }
                        else if (data.type === "link"){ return item.link(index, data.src, data.href, data.caption) }
                        else if (data.type === "slider"){ return item.slider(index, data.source) }
                        else { return(null); }
                    })}
                </div>
            </div>

            <HLine color={colorArray[num]} border={3}/>
            <div className="section artists">
                <div className="title">
                    {text("gallery", "artist", lang)}
                </div>
                
                <div className="flex-row-wrapper">
                {
                    data[0][0].artists.map( (data, index) => <Artist lang={lang} key={index} name={data} />)
                }
                </div>

                {
                    item.video( 0, data[0][0].interview, width)
                }
            </div>
            
            
            <Link to={{
                pathname : `/lobby/${num}`,
                state : { workID : workID }
            }} >
                <div className="goLobby" 
                    onMouseEnter = {(e) => document.querySelector('.goLobby').style.backgroundColor = colorArray[num]} 
                    onMouseLeave = {(e) => document.querySelector('.goLobby').style.backgroundColor = 'white'}
                >
                    <div className="flex-row-wrapper"  >
                        <div className="title">
                            {text("gallery", "goLobby", lang)}
                        </div>
                        <svg className="icon" version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 57.3 36.8" overflow="visible" height="30px" >
                            <g>
                                <line className="line" fill="none" stroke={colorArray[num]} strokeWidth="5" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" y1="19.4" x2="50.8" y2="19.4"/>
                                <polyline className="line"fill="none" stroke={colorArray[num]} strokeWidth="5" strokeLinecap="round" strokeMiterlimit="10" points="39,7.5 50.8,19.4 39,31.2 	"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </Link>
            
            <GNB 
                backgroundColor="white"
                lang={lang} setLang={setLang}
                currentPosition={text("gallery", "currentPosition", lang) + data[0][0].title }
            />
        </div>
    );
    return element;
}

export default Gallery