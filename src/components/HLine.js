const HLine = ({color, border}) => {
    return(
        <div style={{
            width : `100%`,
            height : `${border}px`,
            minHeight : `${border}px`,
            backgroundColor : color
        }}>

        </div>
    )
};

export default HLine