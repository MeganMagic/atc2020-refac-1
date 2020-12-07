import { useEffect } from 'react';
import GNB from '../components/GNB';
import '../css/Staffs.css';
import credit from '../data/credit.json';
import HLine from '../components/HLine';

const Item = ({position, name, image}) => 
    <div className="item">
        <div className="profileHolder" style={{marginBottom:"10px",backgroundImage:`url(${image})`}}></div>        
        <div style={{fontSize:"22px", fontWeight:"800"}}>{position}</div>
        <div style={{fontSize:"22px"}}>{name}</div>
    </div>

const themeColor = "#d9764c";
const Credit = () => {
    useEffect(()=>{
        document.body.style.color = "#161616";
        document.body.style.backgroundColor = themeColor;
        return () => document.body.style.backgroundColor = "white";
    })
    return(
        <div className="staffs">
            <div className="section CD">
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "CD").map((data, index) => 
                        <Item key={index} position={data.position_KO} name={data.name_KO} image={data.image} />
                    )
                }
                </div>
            </div>

            <HLine color="#161616" border={1} />
            
            <div className="section planning">
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "planning").map((data, index) => 
                        <Item key={index} position={data.position_KO} name={data.name_KO} image={data.image} />
                    )
                }
                </div>
            </div>

            <HLine color="#161616" border={1} />

            <div className="section archive">
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "Archive").map((data, index) => 
                        <Item key={index} position={data.position_KO} name={data.name_KO} image={data.image} />
                    )
                }
                </div>
            </div>

            <HLine color="#161616" border={1} />

            <div className="section brand">
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "Brand").map((data, index) => 
                        <Item key={index} position={data.position_KO} name={data.name_KO} image={data.image} />
                    )
                }
                </div>
            </div>

            <HLine color="#161616" border={1} />

            <div className="section ETC">
                <div className="flex-row-wrapper">
                {
                    credit.filter((x) => x.category === "ETC").map((data, index) => 
                        <Item key={index} position={data.position_KO} name={data.name_KO} image={data.image} />
                    )
                }
                </div>
            </div>

            <div className="section">

            </div>

            <GNB color={themeColor} />            
        </div>
    )
}
export default Credit