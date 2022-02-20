import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Level1.css';
import GNB from '../components/GNB';
import HLine from '../components/HLine';
import useAxios from '../hooks/useAxios';
import text from '../hooks/useLangSwitch';
import Carousel from 'react-elastic-carousel';


const sendLogResponse =  (e, nameRef, messRef, setTrigger) => {
    //1. 내용이 빈 경우
    if(messRef.current.value === "" || nameRef.current.value === ""){
        alert("내용을 채우세요");
        return;
    }
    //2. 내용이 " "인 경우
    if( nameRef.current.value.split(" ").filter(x => x !== "").length === 0 ||
        messRef.current.value.split(" ").filter(x => x !== "").length === 0
    ){
        alert("내용을 채우세요");
        nameRef.current.value = '';
        messRef.current.value = '';
        return;
    }

    e.preventDefault();
    axios.get(
        "https://script.google.com/macros/s/AKfycbwSALIdVZMx0-U5DOfi-Ivm6Pq8uyhO0bf_4RXeljUVk2r6BWc/exec",
        { params : {
            "이름": `"${nameRef.current.value}"`,
            "메세지": `"${messRef.current.value}"`
            }
        }
    )
    .then( (res) =>  {
        setTrigger(Date.now);
        const logsTop = document.querySelector('.logs').offsetTop;
        if(logsTop && window.scrollY > 536) {
            window.scrollTo({top: logsTop-50, left:0, behavior:'smooth'});
        }
    })
    .catch(error => {
        console.log(error);
     });

    //전송되었습니다.
    alert(`${nameRef.current.value}님의 코멘트가 등록되었습니다 ^__^*`);
    //clear
    nameRef.current.value = '';
    messRef.current.value = '';
};

const Log = ({ name, comment, timestamp, color }) => {
    //early exit, if data is strange
    if( !( name || comment || timestamp || color ) ) return null;

    //이름 60자 제한
    if(name.length >= 60) { name = name.slice(0, 60); }
    const fontSize = 
        comment.length <= 12 ? 42 :
        comment.length <= 22 ? 36 :
        comment.length <= 42 ? 30 :
        comment.length <= 62 ? 24 : 20;
    ;
    return(
        <div className="log" style={{backgroundColor:color}} >
            <div className="info">
                <div className="name"> {name ? name.slice(1, -1) : ''} </div>
                <div>{timestamp}</div>
            </div>
            <div className="comment" style={{fontSize:fontSize}}>{comment ? comment.slice(1, -1) : ''}</div>
        </div>
    );
}

const LogsHolder = ({message}) => {
    return(
        <div style={{
            width : "100%", height : "300px", whiteSpace : "pre-line", textAlign:"center",
            display : "flex", justifyContent:"center", alignItems:"center"
        }}>
            <div style={{fontSize:"24px", fontWeight:"800"}}>
                {message}
            </div>
        </div>
    );
}

const colors = ["#ffffff", "#d9706c", "#518C31", "#d66d40", "#4386B7"];
const colorArray100 = Array(100).fill().map( (_) => colors[Math.floor(Math.random()*5)]);

const Level1 = ({ lang, setLang }) => {
    const logNameRef = useRef(null);
    const logMessRef = useRef(null);
   
    const [ logCount , setLogCount ] = useState('-');
    const [ trigger, setTrigger ] = useState();
    const [ isAuto, setIsAuto ] = useState(true);
    const { loading, error, data, refetch } = useAxios(`https://docs.google.com/spreadsheets/d/1jabZBtATvQRy0035HlgBzq0nHq2nZ1025skCQDy1i78/gviz/tq?`, "logs")
        
    //cdm
    useEffect(()=>{
        window.scrollTo(0,0);
        document.body.style.color = "#161616";
        document.body.style.backgroundColor = "#efefef";
        return () => document.body.style.backgroundColor = "white";
    }, []);
    //cdu, by data
    useEffect(()=>{
        if (!loading) { 
            setLogCount(data.length);
        }
    }, [data])
    //cdu, by trigger
    useEffect(()=>{
        refetch();
    }, [trigger])

    return(
        <div className="main level1" >
            <div className="section">
                <div className="title emphasis">
                    {text("store", "floor", lang)}
                </div>
                <div className="title" style={{paddingTop:"25px"}}>
                    {text("store", "floor_info", lang)}
                </div>
            </div>
            <HLine color="#161616" border={3} />

            <div className="section logs">
                <div className="title">
                    {logCount} {text("store", "logCount", lang)}
                </div>     
                <div className="carousel_wrapper"
                    onMouseEnter = { () => setIsAuto(false) }
                    onMouseLeave = { () => setIsAuto(true) }
                >           
                {
                    loading ?
                    <LogsHolder message={`Loading...`}/> :
                    error ?
                    <LogsHolder message={`ERROR!\nPlease refresh the page`} /> :
                    <Carousel 
                        pagination={false} 
                        itemsToScroll={1} itemsToShow={3}
                        enableAutoPlay={isAuto} autoPlaySpeed={7000}
                        breakPoints={[
                            {width : 1, itemsToShow : 1},
                            {width : 600, itemsToShow : 2},
                            {width : 920, itemsToShow : 3},
                        ]}
                    >
                        {data.map( (d, i) => 
                            <Log key={i} name={d.name} comment={d.comment} timestamp={d.timestamp} color={colorArray100[i%100]}/>
                    )}
                    </Carousel>
                }
                </div>
                <div className="form">
                    <div className="formTitle">
                        {text("store", "writeLog", lang)}
                    </div>
                    <div className="item">
                        <label>
                            {text("store", "formName", lang)}
                            <input className="myInput" type="text" ref={logNameRef} />
                        </label>
                    </div>
                    <div className="item">
                        <label>
                            {text("store", "formComment", lang)}
                            <textarea className="myInput" rows={2} ref={logMessRef} />
                        </label>
                    </div>
                    <button onClick={(e)=> {sendLogResponse(e, logNameRef, logMessRef, setTrigger)} }>
                        {text("store", "formSubmit", lang)}
                    </button>
                </div>
            </div>

            <HLine color="#161616" border={3} />
            <div className="section stores">
                <div className="title" style={{marginBottom:"100px"}}>
                    {text("store", "storeTitle", lang)}
                </div>


                <HLine border={1} color="#161616"/>
                <div className="store dorok">
                    <div className="info">
                        <div className="subTitle">
                            {text("store", "dorokTitle", lang)}
                        </div>
                        <div className="text">
                            {text("store", "dorokText", lang)}
                        </div>
                    </div>
                    <div className="content form">
                        <iframe title="dorok" className="googleForm" src="https://docs.google.com/forms/d/e/1FAIpQLSflG_DBcw0luDXxCYF5E9L6HuNr4encYOY_x8LDCfoG2ZJbSg/viewform?embedded=true" width="640" height="1238" frameBorder="0" marginHeight="0" marginWidth="0">로드 중…</iframe>
                    </div>
                </div>

                <HLine border={1} color="#161616"/>
                <div className="store docent">
                    <div className="info">
                        <div className="subTitle">
                            {text("store", "docentTitle", lang)}
                        </div>
                        <div className="text">
                            {text("store", "docentText", lang)}
                        </div>
                        <div className="text schedule">
                            {text("store", "docentSchedule", lang)}
                        </div>
                    </div>
                    <div className="content form">
                        <iframe title="docent" className="googleForm" src="https://docs.google.com/forms/d/e/1FAIpQLSfwoeEWWu2hgJOCk0hGTZgbq-asmCAnQksjKIs-Vt-8ZEuEcA/viewform?embedded=true" width="640" height="929" frameBorder="0" marginHeight="0" marginWidth="0">로드 중…</iframe>
                    </div>
                    
                </div>

                <HLine border={1} color="#161616"/>
                <div className="store work-17">
                    <div className="info">
                        <div className="subTitle">
                            {text("store", "work-17Title", lang)}
                        </div>
                        <div className="text">
                            {text("store", "work-17Text", lang)}
                        </div>
                    </div>
                    <div className="content form">
                        <iframe title="work-17" className="googleForm" src="https://docs.google.com/forms/d/e/1FAIpQLSddZwzclbmfI3_Suous-5NV2Gz2s5yLJXSJp7Gu8h0UjA22HQ/viewform?embedded=true" width="640" height="1109" frameborder="0" marginHeight="0" marginWidth="0">로드 중…</iframe>    
                    </div>
                </div>
                
            </div>
            
            <Link to="/">
                <div className="goHome">
                    <div className="flex-row-wrapper"  >
                        <div className="title">
                            {text("store", "goHome", lang)}
                        </div>
                        <svg className="icon" version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 57.3 36.8" overflow="visible" height="30px" >
                            <g>
                                <line className="line" fill="none" stroke="#161616" strokeWidth="5" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" y1="19.4" x2="50.8" y2="19.4"/>
                                <polyline className="line"fill="none" stroke="#161616" strokeWidth="5" strokeLinecap="round" strokeMiterlimit="10" points="39,7.5 50.8,19.4 39,31.2 	"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </Link>
            
            <GNB backgroundColor="#efefef"
                lang={lang} setLang={setLang}
                currentPosition={text("store", "currentPosition", lang)}
            />

        </div>

    )
}
export default Level1