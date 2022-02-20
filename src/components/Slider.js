import { useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';

const Slider = ({ links }) => {
    const linkArray = links.split("\n");    
    return(
        <Carousel className="item slider" 
            pagination={false} 
            itemsToShow={1} 
            itemsToScroll={1}
        >
            {
                linkArray.map((d, i) => <img className="carousel-item" src={d} key={i} /> )
            }
        </Carousel>
    )
}

export default Slider;