import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useParams, Link, useLocation} from 'react-router-dom';
import axios from 'axios';

//component
import item from '../components/lobbyComponent';
import stairway from '../data/stairway.jpg';

//hooks
import useAxiosAll from '../hooks/useAxiosAll';
import useScrollChange from '../hooks/useScrollChange';

const lobbyComponentUrl = (level) => `https://docs.google.com/spreadsheets/d/1i4DrB3mIM3yF6XUs_5hHO04-TGrbY2HtqUuJomCp-C4/gviz/tq?tq=SELECT+B%2c+C%2c+D+WHERE+A%3d${level}`;
const worksInfoForLobbyUrl = (level) => `https://docs.google.com/spreadsheets/d/1lW9xsfxeghuknmVyrVNrkD9o-E9H4AbYiYy4dQ0aRCI/gviz/tq?tq=SELECT+B%2c+C%2c+D%2c+H+WHERE+A%3d${level}`;
const colorArray = [ null, null, "#161616", "#CC6865", "#4386B7", "#518C31", "#C0653E"];

const generateItem = (comps, works, level) => {
    return comps.map((comp, index) => {
        if(comp.type === "head"){
            return item.head(index, comp.title, comp.desc)
        }
        else if (comp.type === "sub"){
            return item.sub(index, comp.title, comp.desc, colorArray[level])
        }
        else if (comp.type === "entrance"){
            const work = works.filter(work => {
                return comp.workID === work.workID
            })[0];
            return item.entrance(index, level, comp.workID, work.title, work.desc, work.thumbnail)
        }
    });
}

const Level = () => {
    const location = useLocation();
    const { num } = useParams();
    const [ items, setItems ] = useState(null);
    const changer = useScrollChange();

    const urls = [lobbyComponentUrl(num), worksInfoForLobbyUrl(num)];
    const tables = ["lobby", "worksInfoForLobby"];
    const { loading, error, data, refetch } = useAxiosAll(urls, tables, axios);
    //cdm
    useEffect(()=>{
        console.log("Level CDM");
        document.body.style.color = colorArray[num];
    }, []);

    //cdu, num
    useEffect(()=>{
        console.log("Level CDU, by level");
        document.body.style.color = colorArray[num];
        //navigation
        const navItems = document.querySelectorAll(`.navItem`);
        navItems.forEach((item) => item.style.backgroundColor = "inherit");
        navItems.forEach((item) => item.style.color = "inherit");

        document.querySelector(`#navigationLevel${num}`).style.backgroundColor = colorArray[num];
        document.querySelector(`#navigationLevel${num}`).style.color = "white";
        document.querySelector(`.navigation`).style.borderColor = colorArray[num];


        refetch();

    }, [num]);

    //cdu, data
    useEffect(()=>{
        console.log("Level CDU, by data");
        if(!loading) {
            console.log("item setting");
            setItems( generateItem(data[0], data[1], num) );
        }
    }, [data])
    //cdu, changer.ref
    //Gallery 로비로 나가기했을때, workid 위치로 이동하기
    useEffect(()=>{
        if(changer.ref.current){
            console.log("ref is setted");
            if(location.state && location.state.workID){
                const ref = document.querySelector(`#${location.state.workID}`);
                changer.ref.current.scrollLeft = ref.offsetLeft - 100;
            }
        }
    }, [changer.ref.current])



    if(loading) return (
        <div>Loading...</div>
    )
    if(error) return <div>error!</div>
    return(
        <ul className="content" {...changer} id={`level${num}`}>
            <li className="item-intro">
                <div className="flex-vertical-wrapper">
                    <img className="intro-img" alt={`level${num}`} src={require(`../data/level${num}.png`).default} />
                </div>
            </li>
            <li style={{color:"white", fontSize : "180px", fontWeight:"800", textShadow:`-1px 0 ${colorArray[num]}, 0 1px ${colorArray[num]}, 1px 0 ${colorArray[num]}, 0 -1px ${colorArray[num]}`, verticalAlign:"top", marginLeft:"50px", marginTop:"10vh" }}>{num}층</li>
            {items}
            <li style={{height:"100vh", width:"1px", backgroundColor:colorArray[num], marginRight:"120px"}}></li>
            <li>
                {
                    num > 2 ?
                    <Link to={`/lobby/${num-1}`}>
                        <img src={stairway} alt="move next level" />
                    </Link>
                    :
                    <Link to={`/level1`}>
                        <img src={stairway} alt="move next1" />
                    </Link>
                }
            </li>
            
        </ul>
    )
}

export default Level