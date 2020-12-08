import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Level1.css';
import GNB from '../components/GNB';
import HLine from '../components/HLine';
import useAxios from '../hooks/useAxios';
import Carousel from 'react-elastic-carousel';


const sendLogResponse =  (e, nameRef, messRef, setTrigger) => {
    console.log(messRef);
    if(messRef.current.value === "" || nameRef.current.value === ""){
        alert("내용을 채우세요");
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
        console.log(res);
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
            width : "100%", height : "300px",
            display : "flex", justifyContent:"center", alignItems:"center"
        }}>
            <div style={{fontSize:"24px", fontWeight:"800"}}>
                {message}
            </div>
        </div>
    );
}

const Level1 = () => {
    const logNameRef = useRef(null);
    const logMessRef = useRef(null);
    const colors = ["#efefef", "#d9706c", "#518C31", "#d66d40", "#4386B7"];
    
    const [ logCount , setLogCount ] = useState(0);
    const [ trigger, setTrigger ] = useState();
    const { loading, error, data, refetch } = useAxios(`https://docs.google.com/spreadsheets/d/1jabZBtATvQRy0035HlgBzq0nHq2nZ1025skCQDy1i78/gviz/tq?`, "logs")
    
    //cdm
    useEffect(()=>{
        window.scrollTo(0,0);
    }, []);
    //cdu, by data
    useEffect(()=>{
        if (!loading) { 
            console.log(data);
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
                <div className="title emphasis">1층</div>
                <div className="title" style={{paddingTop:"25px"}}>방명록과 스토어</div>
            </div>
            <HLine color="#161616" border={3} />

            <div className="section logs">
                <div className="title">총 {logCount}개의 방명록</div>                
                {
                    loading ?
                    <LogsHolder message="Loading..."/> :
                    error ?
                    <LogsHolder message="ERROR!" /> :
                    <Carousel 
                        pagination={false} 
                        itemsToScroll={1} itemsToShow={4}
                        enableAutoPlay autoPlaySpeed={7000}
                        breakPoints={[
                            {width : 1, itemsToShow : 1},
                            {width : 600, itemsToShow : 2},
                            {width : 920, itemsToShow : 3},
                        ]}
                    >
                        {data.map( (d, i) => 
                            <Log key={i} name={d.name} comment={d.comment} timestamp={d.timestamp} color={colors[Math.floor(Math.random()*5)]}/>
                    )}
                    </Carousel>
                }
                <div className="form">
                    <div className="formTitle">방명록 남기기</div>
                    <div className="item">
                        <label>
                            이름
                            <input className="myInput" type="text" ref={logNameRef} />
                        </label>
                    </div>
                    <div className="item">
                        <label>
                            코멘트
                            <textarea className="myInput" rows={2} ref={logMessRef} />
                        </label>
                    </div>
                    <button onClick={(e)=> {sendLogResponse(e, logNameRef, logMessRef, setTrigger)} }>등록하기</button>
                </div>
            </div>

            <HLine color="#161616" border={3} />
            <div className="section store">
                <div className="title">스토어</div>
                <div className="text">전시 도록과 작품 굿즈를 구매할 수 있습니다. 무료배송✨💸 </div>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSelac93rDHyfD8iXXXUjMcT10EaWdYn_Npf_Qlh6oICB7CQvQ/viewform?embedded=true" width="640" height="676" frameborder="0" marginheight="0" marginwidth="0">로드 중…</iframe>
            </div>

            <HLine color="#161616" border={3} /> 
            <div>
                Home으로
            </div>

            <GNB color="white"/>

        </div>

    )
}
export default Level1