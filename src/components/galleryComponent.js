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
    link : (key, src, href) => (
        <div className="item image" key={key}>
            <a className="link" key={key} href={href} target="_blank">
                <img alt="link" src={src} key={key} />
            </a>
        </div>
    ),
    slider : (key, links) => (
        <Slider key={key} links={links}/>
    )
};
export default galleryComponent;