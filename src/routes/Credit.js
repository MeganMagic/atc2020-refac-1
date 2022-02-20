import { useEffect } from 'react';
import GNB from '../components/GNB';
import '../css/Credit.css';

import credit from '../data/credit.json';
import HLine from '../components/HLine';
import text from '../hooks/useLangSwitch';

const Item = ({position, name, image, major}) => 
    <div className="item">
        <div className="profileHolder" style={{marginBottom:"10px",backgroundImage:`url(${image})`}}></div>        
        <div style={{fontSize:"22px", fontWeight:"800"}}>{position}</div>
        <div style={{fontSize:"13px"}}>{major}</div>
        <div style={{fontSize:"22px"}}>{name}</div>
    </div>

const themeColor = "#d9764c";
const Credit = ({ lang, setLang }) => {
    useEffect(()=>{
        window.scrollTo(0, 0);
        document.body.style.color = "#161616";
        document.body.style.backgroundColor = themeColor;
        return () => document.body.style.backgroundColor = "white";
    }, [])
    return(
        <div className="main credit">
            <div className="section CD">
                <div className="title" style={{paddingBottom:"10px"}}>
                    {lang==="KO" ? "크리에이티브 디렉터" : "CREATIVE DIRECTOR"}
                </div>
                <div className="flex-row-wrapper">
                    <div className="item">
                        <div className="urim profileHolder" style={{backgroundImage:`url(https://i.imgur.com/0aVQyRM.png)`}}> </div>
                        <div style={{fontSize:"16px"}}>{lang==="KO"? "아텍15": "Art&Technology 15"}</div>
                        <div style={{fontWeight:"800",fontSize:"30px"}}>{lang === "KO" ? "최우림" : "Urim Choi"}</div>
                    </div>
                </div>
            </div>

            <HLine color="#161616" border={1} />
            
            <div className="section planning">
                <div className="title">
                    {lang==="KO" ? "기획부" : "PLANNING DEPARTMENT"}
                </div>
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "planning").map((data, index) => 
                        <Item key={index} 
                            position={lang==="KO" ? data.position_KO : data.position_EN} 
                            name={lang==="KO" ? data.name_KO : data.name_EN} 
                            major={lang==="KO" ? data.major_KO : data.major_EN}
                            image={data.image} 
                        />
                    )
                }
                </div>
            </div>

            <HLine color="#161616" border={1} />

            <div className="section archive">
                <div className="title">
                    {lang==="KO" ? "아카이빙부" : "ARCHIVING DEPARTMENT"}
                </div>
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "Archive").map((data, index) => 
                        <Item key={index} 
                            position={lang==="KO" ? data.position_KO : data.position_EN} 
                            name={lang==="KO" ? data.name_KO : data.name_EN} 
                            major={lang==="KO" ? data.major_KO : data.major_EN}
                            image={data.image} 
                        />
                    )
                }
                </div>
            </div>

            <HLine color="#161616" border={1} />

            <div className="section brand">
                <div className="title">
                    {lang==="KO" ? "브랜딩부" : "BRANDING DEPARTMENT"}
                </div>
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "Brand").map((data, index) => 
                        <Item key={index} 
                            position={lang==="KO" ? data.position_KO : data.position_EN} 
                            name={lang==="KO" ? data.name_KO : data.name_EN} 
                            major={lang==="KO" ? data.major_KO : data.major_EN}
                            image={data.image} 
                        />
                    )
                }
                </div>
            </div>

            <HLine color="#161616" border={1} />

            <div className="section ETC">
                <div className="title">
                    AND
                </div>
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "ETC").map((data, index) => 
                        <Item key={index} 
                            position={lang==="KO" ? data.position_KO : data.position_EN} 
                            name={lang==="KO" ? data.name_KO : data.name_EN} 
                            major={lang==="KO" ? data.major_KO : data.major_EN}
                            image={data.image} 
                        />
                    )
                }
                </div>
            </div>

            <div className="section">

            </div>

            <GNB backgroundColor={themeColor}
                lang={lang} setLang={setLang}
                currentPosition={text("credit", "currentPosition", lang)}
            />            
        </div>
    )
}
export default Credit