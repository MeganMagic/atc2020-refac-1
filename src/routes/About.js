import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import GNB from '../components/GNB';
import HLine from '../components/HLine';

import '../css/About.css';

const aboutATC = "ATC는 'Art & Technology Conference'의 약자로 서강대학교 Art & Technology 학과에서 매년 개최되어 왔습니다. 2012년을 시작으로 올해 9회째를 맞는 ATC는 미디어아트, 디자인, 영상, 퍼포먼스 등 다양한 장르의 학생 작품들을 전시하고 공유하는 자리입니다. 학생이 주체가 되어 완성되는 ATC는 예술, 기술, 인문학 등 학제간 경계없이 다양한 시도를 하고,새로운 가치를 추구하고 있는 Art & Technology의 지향성과 정체성을 여실히 드러냅니다.";
const jusubSays = `인문, 예술, 테크놀로지의 초학제간 융합을 통해 경계없는 실험을 펼치는 21팀의 크리에이터들의 상상력 넘치는 축제에 여러분을 초대합니다. 
특히, 2012년을 시작으로 올해로 9회를 맞이하는 ATC 가 올해는 최초로 모든 전시를 가상 전시로 진행합니다. 
가상의 공간에서 다채로운 상상력으로 전시되어 지는 미디어 아트, 영상, 게임, 퍼모먼스, VR, 앱, 웹아트 등의 다양한 창작품을 함께 즐기고, 공감하고, 축하하는 이 시간에 여러분을 정중히 초대합니다.`;
const aboutAND = `‘&’는 연결이다. 이 연결은 대상들의 단편적 병치에서 시작된다. 그리고 이는 단순한 나열을 넘어 그 이상의 새로운 의미를 파생시켜왔다. 어떤 대상들은 서로가 연결됨으로써 하나로 융화되어 새로운 가치를 창출해내기도 하며, 때로는 그 과정 속에서 본연의 개성이 묵살되기도 한다. 이처럼 ‘&’는 평면적이던 개별적 속성들을 다양하게 재편하는 입체적인 기호로서의 지위를 갖는다.

우리의 생각은 ‘&’를 입체적으로 재구성하며 이루어진다. 우리는 생각을 끊임없이 해체하고 연결하며, 이질적 존재 속 교차점을 찾아낸다. 이 과정은 때때로 인간을 방황하고 불안하게 하지만 그럼에도 인간은 주저하지 않는다. 스스로 연결고리가 되어 끊임없이 노력하고, 보이지 않던 교차점마저 구체화하며 한계를 극복하려 한다. 이 일련의 과정은 ‘&’와 인간의 공통점을 시사한다. 인간은 불안 속에서 앞으로 나아가는 존재이고, ‘&’는 불완전한 속성을 연결하고 새로운 가치를 창출하는 기호다.

‘&’는 우리에게 연결이 어떠한 의미인지 돌아보게 한다. 예술과 기술, 이상과 현실, 소수와 다수, 그리고 각각의 삶은 ‘&’를 마주하며 새로운 길을 만들어 가고 있다. 무한한 가능성을 펼칠 수 있게 하지만 모순적이게도 다양한 요소들은 ‘&’로 묶이며 본연의 고유성을 잃기도 한다.

모든 연결은 우리의 작은 움직임으로부터 시작된다. 지금 이 순간에도 누군가는 다양한 길을 연결하며 새로운 곳을 개척해 나가고 있다. 한계에 부딪히면서도 보이지 않는 곳에서 이루어지고 있는 연결들이 공허한 나열로 남겨지지 않도록, 그 움직임을 조명하고자 한다.
`;
const atcHistory = [
    {
        year : 2019,
        title : "심장이 두개골 속으로 옮겨가는 지도",
        desc : "복합문화예술공간 행화탕에서 진행"
    },
    {
        year : 2018,
        title : "홈커밍: Homecoming",
        desc : "______란 무엇인가? \n 상설 전시 진행"
    },
    {
        year : 2017,
        title : "in^voice",
        desc : "개인에게 주어지는 요구 속, 밀려나는 스스로의 목소리를 찾기 위한 노력 \n첫 영화제 개최"
    },
    {
        year : 2016,
        title : "당신의 하루는 환상으로 가득한가요?",
        desc : "우리 모두의, 저마다의 크고 작은 환상에 관하여"
    },
    {
        year : 2015,
        title : "월요일 아침, 의문은 다시 시작되었다",
        desc : "베일 뒤 감춰진 무언가의 불확실성"
    },
    {
        year : 2014,
        title : "As If",
        desc : "꿈꾸는 모습이 되어, ‘마치 ~인 것 처럼’ "
    },
    {
        year : 2013,
        title : "; (Semi-Colon)",
        desc : "끝이 아닌 시작, 재도약"
    },
    {
        year : 2012,
        title : "ATC 2012",
        desc : "제 1회 ATC 개최"
    }
]
const About = () => {
    const [ width, setWidth ] = useState(document.body.clientWidth > 1440? 1240 : document.body.clientWidth-200);
    const throttleResize = _.throttle(()=>{
        console.log(document.body.clientWidth);
        setWidth(document.body.clientWidth > 1440?  1240 : document.body.clientWidth-200);
    }, 200);
    window.onresize = (e) => throttleResize();

    useEffect(()=>{
        console.log("about CDU");
        document.body.style.color = "#161616";
        document.body.style.backgroundColor = "#50a0d9";
        return() => document.body.style.backgroundColor = "white"
    },[])

    return(
        <div className="main about" style = {{ whiteSpace: 'pre-line'}} >
            <div className="section aboutATC">
                <div className="title">
                    <div style={{marginBottom:"0.2em"}}>about</div> 
                    <div style={{fontSize:"60px"}}>ART AND<br/>TECHNOLOGY<br/>CONFERENCE</div>
                </div>
                <div className="text">{aboutATC}</div>
            </div>

            <HLine color="#161616" border={3} />

            <div className="section greeting">
                <div className="title">학과장 인사말</div>
                <div className="content-wrapper">
                    <div className="image">
                        <img src="http://creative.sogang.ac.kr/wp-content/uploads/2015/08/faculty_jusub_c.jpg" alt="Jusub Kim" width="250px" style={{filter:"grayscale(100%)"}}/>
                        <div className="caption">Art&Technology 학과장<br/><strong>김주섭</strong> 교수</div>
                    </div>
                    <div className="text">{jusubSays}</div>
                </div>
            </div>

            <HLine color="#161616" border={3} />
            
            <div className="section aboutAND">
                <div className="title">ATC2020 주제</div>
                <div className="subTitle">&</div>
                <div className="text">{aboutAND}</div>
            </div>

            <HLine color="#161616" border={3} />

            <div className="section history">
                <div className="title">연혁</div>
                {atcHistory.map( (data, index) => (
                    <div className="text">
                        <div className="flex-row-wrapper">
                            <div style={{fontSize:"36px", fontWeight:"800", lineHeight:"0.8"}}>{data.year}</div>
                            <img src={require(`../data/history/${data.year}.png`).default} style={{width:"200px", height:"282px"}} />
                            <div style={{alignSelf:"flex-end"}}>
                                <div style={{fontSize:"24px", fontWeight:"800", lineHeight:"1", marginBottom:"0.5em"}}>{data.title}</div>
                                <div>{data.desc}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="section footer">
                [go home] or [go lobby]
            </div>

            <GNB color="#50a0d9"/>
        </div>
        
    );
}
export default About;