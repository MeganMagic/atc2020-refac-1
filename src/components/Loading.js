import styled from 'styled-components';

const MainFrame = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    align-items : center;
    font-size : 20px;
    font-weight : 800;
`;
const Loading = ({ width = "100%", height = "100vh" }) => {
    return(
        <MainFrame style={{width:width, height:height}}>
            <div>Loading...</div>
        </MainFrame>
    )
}
export default Loading;