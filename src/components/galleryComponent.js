import Slider from '../components/Slider';

const galleryComponent = {
    text : (key, content) => (
        <div className="item desc" key={key} >{content}</div>
    ),
    image : (key, src) => (
        <div className="item image" key={key}>
            <img alt="detail image" src={src} />
        </div>
    ),
    video : (key, src, width) => (
        <iframe className="item video" key={key} width={width} height={width*0.5625} src={src} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    ),
    link : (key, src, href, caption) => (
        <div className="item image link" key={key}>
            <a key={key} href={href} target="_blank">
                <div style={{ display:"flex", flexDirection:"row", alignItems:"center", justifyContent:`${src==="-" ? "center" : "flex-start"}`}}>
                    <div style={{fontSize:"24px", fontWeight:"800", marginRight:"10px"}}>{caption}</div>
                    <svg className="icon" version="1.1" baseProfile="tiny" id="레이어_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 57.3 36.8" overflow="visible" height="18px" >
                        <g>
                            <line className="line" fill="none" stroke={document.body.style.color} strokeWidth="5" strokeLinecap="round" strokeMiterlimit="10" x1="7.5" y1="19.4" x2="50.8" y2="19.4"/>
                            <polyline className="line"fill="none" stroke={document.body.style.color} strokeWidth="5" strokeLinecap="round" strokeMiterlimit="10" points="39,7.5 50.8,19.4 39,31.2 	"/>
                        </g>
                    </svg>
                </div>
                {
                    src === '-' ? '' : 
                    <img className="linkedImage" alt={`link to ${src}`} src={src} key={key} />
                }
            </a>
        </div>
    ),
    slider : (key, links) => (
        <Slider key={key} links={links}/>
    )
};
export default galleryComponent;