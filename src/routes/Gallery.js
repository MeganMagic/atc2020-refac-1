
import { useState, useEffect, Fragment } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../css/Gallery.css';
import GNB from '../components/GNB'
import item from '../components/galleryComponent';
import useAxiosAll from '../hooks/useAxiosAll';


//temp setting
const width = 800;
const colorArray = [ null, null, "#161616", "#CC6865", "#4386B7", "#518C31", "#C0653E"];
const artist = (key, name) => (
    <div className="item" key={key}>
        <div className="profile" style={{backgroundImage:"url(https://i1.sndcdn.com/avatars-000356327339-k426jj-t500x500.jpg)"}} ></div>
        <div className="name">{name}</div>
        <div className="contact">atstaff@sogang.ac.kr</div>
    </div>
)

const generateItem = (detail) => {
    return detail.map((data, index) => {
        if(data.type === "text"){
            return item.text(index, data.source)
        }
        else if (data.type === "image"){
            return item.image(index, data.source)
        }
        else if (data.type === "video"){
            return item.video(index, data.source, width)
        }
        else if (data.type === "link"){
            return item.link(index, data.src, data.href)
        }
        else if (data.type === "slider"){
            return item.slider(index, data.source)
        }
    });
}

const Gallery = () => {
    const history = useHistory();
    const { num, workID } = useParams();
    const [ items, setItems ] = useState([]);

    const urls = [`https://docs.google.com/spreadsheets/d/1lW9xsfxeghuknmVyrVNrkD9o-E9H4AbYiYy4dQ0aRCI/gviz/tq?tq=SELECT+A%2c+C%2c+F%2c+G%2c+I%2c+J+WHERE+B%3d%22${workID}%22`, `https://docs.google.com/spreadsheets/d/1pyAsDTCxzieDew0aZLHhIQpAgG6smwTqhGy3kcvE5n4/gviz/tq?tq=SELECT+B%2c+C%2c+D+WHERE+A%3d%22${workID}%22`];
    const tables = ["worksInfoForGallery", "worksDetail"]
    const { loading, error, data, refetch } = useAxiosAll( urls, tables, axios );

    //cdm
    useEffect(()=>{
        console.log("Gallery CDM");
        document.body.style.color = colorArray[num];
        document.body.style.overflow = "scroll";
    }, [])
    //cdu
    useEffect(()=>{
        console.log("Gallery CDU, by data");
        if(!loading){
            setItems( generateItem(data[1]) )
        }
    }, [data]);

    if(loading) return <div>loading...</div>
    
    return(
        <div className="Gallery" >
            <div className="section intro">
                <div className="wrapper">
                    <div className="title">{data[0][0].title}</div>
                    <div className="genre">{data[0][0].genre}</div>
                    <iframe className="video" width={width} height={width*0.5625} src={data[0][0].archiving} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div className="desc">{data[0][0].detailDesc}</div>
                </div>
            </div>

            <div className="line" style={{backgroundColor:colorArray[num]}}></div>
            <div className="section detail">
                <div className="title"> <div className="text">작품 상세</div> </div>
                <div className="wrapper"> {items} </div>
            </div>

            <div className="line" style={{backgroundColor:colorArray[num]}}></div>
            <div className="section artist">
                <div className="title"> <div className="text">아티스트</div> </div>
                <div className="wrapper">
                    <div className="list">
                        {data[0][0].artists.map((data, index) => artist(index, data))}
                    </div>
                </div>
            </div>
            
            <Link to={{
                pathname : `/lobby/${num}`,
                state : {
                    workID : workID
                }
            }} >
                <div className="goBack">
                    <div className="text">로비로 나가기</div>
                </div>
            </Link>

            <GNB />
        </div>
    );
}

export default Gallery