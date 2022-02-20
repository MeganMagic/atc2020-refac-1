import artistsList from '../data/artists.json';
import holder from '../data/profileHolder.png';

const Artist = ({lang, key, name}) => {
    const isKO = lang === "KO";
    const color = document.body.style.color;
    const data = artistsList.filter((x) => x.name_KO === name || x.name_EN === name)[0]
    return(
        <div className="item" key={key}>
            <div className="profile" style={{backgroundImage:`url(${data.image? data.image === '-' ? holder : data.image : holder})`, backgroundColor:color}} ></div>
            <div className="info">
                <div className="name">
                    {isKO ? data.name_KO : data.name_EN}
                </div>
                <div className="major">
                    {isKO ? data.major_KO : data.major_EN}
                </div>
                {
                    data.mail === '-' ? '' :
                    <div className="mail" style={{fontSize : "12px"}}>{data.mail}</div>
                }
                {
                    data.site === '-' ? '' :
                    <div className="link site" >
                        <a href={`http://${data.site}`} target="blank">
                            <div className="goToLink" >
                                <div>{data.site}</div>
                                <svg className="icon" version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 57.3 36.8" overflow="visible" height="14px" style={{marginLeft:"5px"}}>
                                    <g>
                                        <line className="line" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" y1="19.4" x2="50.8" y2="19.4"/>
                                        <polyline className="line"fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" points="39,7.5 50.8,19.4 39,31.2 	"/>
                                    </g>
                                </svg>
                            </div>
                        </a>
                    </div>
                }
                {
                    data.sns === '-' ? '' :
                    <div className="link sns" >
                        <a href={data.sns_link} target="blank">
                            <div className="goToLink">
                                <div>{data.sns}</div>
                                <svg className="icon" version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 57.3 36.8" overflow="visible" height="14px" style={{marginLeft:"5px"}}>
                                    <g>
                                        <line className="line" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" y1="19.4" x2="50.8" y2="19.4"/>
                                        <polyline className="line"fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeMiterlimit="10" points="39,7.5 50.8,19.4 39,31.2 	"/>
                                    </g>
                                </svg>
                            </div>
                        </a>
                    </div>
                }
            </div>
        </div>
    )
}

export default Artist