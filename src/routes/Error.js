import { Link } from 'react-router-dom';
import img404 from '../data/404.png'
import styled from 'styled-components';

const MainFrame = styled.div`
    display : flex;
    width : 100vw;
    height : 100vh;
    overflow : hidden;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`;
const TextDiv = styled.div`
    text-align : center;
`;
const Emphasis = styled.div`
    font-size : 5vh;
    font-weight : 800;
    margin-bottom : 3vh;
`
const Error = () => {
    return(
        <MainFrame className="error">
            <img src={img404} width="400px"/>
            <TextDiv>
                <Emphasis>Page not found</Emphasis>
                <div>
                    The page you are looking for doesn't exist or an other error occured.<br/>
                    Go to our <Link to="/">Homepage</Link> or go back to previous page.
                </div>
            </TextDiv>
        </MainFrame>
    )
}
export default Error;