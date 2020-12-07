import artistsList from '../data/artists.json'

const Artist = ({key, name}) => {
    const color = document.body.style.color;
    const data = artistsList.filter((x) => x.name_KO === name || x.name_EN === name)[0]
    console.log(data);
    return(
        <div className="item" key={key}>
            <div className="profile" style={{backgroundImage:`url(${data.image})`, backgroundColor:color}} ></div>
            <div className="info">
                <div className="name">{data.name_KO}</div>
                {
                    data.mail === '-' ? '' :
                    <div className="mail" style={{fontSize : "12px"}}>{data.mail}</div>
                }
                {
                    data.site === '-' ? '' :
                    <div className="site" style={{margin: "0 auto", width:"fit-content"}}>
                        <a href={`http://${data.site}`} target="blank">
                            <div style={{display:"flex", flexDirection:"row", alignItems:"center", borderBottom:"solid 1px"}}>
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
                    data.SNS === '-' ? '' :
                    <div className="sns" style={{margin: "0 auto", width:"fit-content"}}>
                        <a href={data.SNS_link} target="blank">
                            <div style={{display:"flex", flexDirection:"row", alignItems:"center", borderBottom:"solid 1px"}}>
                                <div>{data.SNS}</div>
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