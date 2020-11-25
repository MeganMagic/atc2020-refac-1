import { useRef, useState } from 'react';

const Slider = ({ links }) => {
    const sliderRef = useRef(null);
    const [ index, setIndex ] = useState(0);
    const linkArray = links.split("|");
    const nLink = linkArray.length;
    const clicked = (e) => {
        let nextIndex = index;
        const standard = document.body.clientWidth / 2;
        if(e.clientX < standard) { 
            nextIndex = nextIndex === 0 ? 
                        nLink - 1:
                        nextIndex - 1;
            }
        else{ 
            nextIndex = nextIndex === (nLink-1) ?
                        0 : 
                        nextIndex + 1;
        }
        setIndex(nextIndex);
    }
    const width = sliderRef.current ? sliderRef.current.clientWidth : 800;
    console.log("slider index : " + index);
    return(
        <div className="item slider" 
            ref={sliderRef} onClick={clicked} 
            style={{
                height : width*0.5625,
                backgroundImage : `url(${linkArray[index]})`
            }} >
            <div className="button" id="left" style={{width : width*0.25}}>
                <div>{`<`}</div>
            </div>
            <div className="button" id="right" style={{width : width*0.25}}>
                {`>`}
            </div>
        </div>
    )
}

export default Slider;