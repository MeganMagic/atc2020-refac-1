import { useState, useEffect } from 'react';
import _ from 'lodash';
import GNB from '../components/GNB';
import HLine from '../components/HLine';
import text from '../hooks/useLangSwitch';

import '../css/About.css';


const atcHistory = [ 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012 ];

const About = ({ lang, setLang }) => {
    const [ width, setWidth ] = useState(document.body.clientWidth > 1440? 1240 : document.body.clientWidth-200);
    const throttleResize = _.throttle(()=>{
        setWidth(document.body.clientWidth > 1440?  1240 : document.body.clientWidth-200);
    }, 200);
    window.onresize = (e) => throttleResize();

    useEffect(()=>{
        document.body.style.color = "#161616";
        document.body.style.backgroundColor = "#50a0d9";
        window.scrollTo(0,0);
        return() => document.body.style.backgroundColor = "white"
    },[])

    return(
        <div className="main about" style = {{ whiteSpace: 'pre-line'}} >
            <div className="section aboutATC">
                <div className="title">
                    <div style={{marginBottom:"0.2em"}}>about</div> 
                    <div style={{fontSize:"60px"}}>ART &<br/>TECHNOLOGY<br/>CONFERENCE</div>
                </div>
                <div className="text">
                    {text("about", "aboutATC", lang)}
                </div>
            </div>

            <HLine color="#161616" border={3} />

            <div className="section greeting">
                <div className="title">
                    {text("about", "sectionGreeting", lang)}
                </div>
                <div className="content-wrapper">
                    <div className="image">
                        <img src="http://creative.sogang.ac.kr/wp-content/uploads/2015/08/faculty_jusub_c.jpg" alt="Jusub Kim" width="250px" style={{filter:"grayscale(100%)"}}/>
                        <div className="caption">
                            {text("about", "jusubCaptionPosition", lang)}<br/>
                            <strong>{text("about", "jusubCaptionName", lang)}</strong>
                        </div>
                    </div>
                    <div className="text">
                        {text("about", "jusubSays", lang)}
                    </div>
                </div>
            </div>

            <HLine color="#161616" border={3} />
            
            <div className="section aboutAND">
                <div className="title">
                    {text("about", "sectionAboutAND", lang)}
                </div>
                <div className="subTitle">&</div>
                <div className="text">
                    {text("about", "aboutAND", lang)}
                </div>
            </div>

            <HLine color="#161616" border={3} />

            <div className="section history">
                <div className="title">
                    {text("about", "sectionHistory", lang)}
                </div>
                {atcHistory.map( (data, index) => (
                    <div className="text">
                        <div className="flex-row-wrapper">
                            <div style={{fontSize:"36px", fontWeight:"800", lineHeight:"0.8"}}>{data}</div>
                            <img src={require(`../data/history/${data}.png`).default} style={{width:"200px", height:"282px"}} />
                            <div style={{alignSelf:"flex-end"}}>
                                <div style={{fontSize:"24px", fontWeight:"800", lineHeight:"1", marginBottom:"0.5em"}}>
                                    {text("about", `title${data}`, lang)}
                                </div>
                                <div>
                                    {text("about", `desc${data}`, lang)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <GNB backgroundColor="#50a0d9" 
                currentPosition="ABOUT"
                lang={lang} setLang={setLang}
            />
        </div>
        
    );
}
export default About;