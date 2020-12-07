import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../css/Navigation.css';


const navList = [
    {
        level : 6,
        category : "조화, 경계",
        items : ["치즈&", "投影(투영)", "이 게임은 처음부터 내가 졌어!", "Dreamcatcher (Don't know why)", "화환 같아", "따뜻한 이글루 만들기 대작전"]
    },
    {
        level : 5,
        category : "파생",
        items : ["Zumi Heroes", "지식 세공사: 분류의 기술", "Du(2) 自己", "Pixel Travel"]
    },
    {
        level : 4,
        category : "확장",
        items : ["Google Edu", "‘2019pkw2020’", "방, 그리고 나", "Artificial Death"]
    },
    {
        level : 3,
        category : "인식",
        items : ["물질 탈피", "B&W", "염리투어", "펑", "프라프라"]
    },
    {
        level : 2,
        category : "환경",
        items : ["Pandemos", "왕궁"]
    }

]

const Navigation = () => {
    const [navToggle, setNavToggle] = useState(false);
    const toggleNav = () => {
        setNavToggle(!navToggle);
        console.log(navToggle);
    }
    const history = useHistory();
    console.log(history);
    //const currentLevel = parseInt( document.querySelector('.content').getAttribute('id') );
    //console.log(currentLevel);

    useEffect(()=>{

    }, [])

    return(
        <div className={['navigation', navToggle ? 'navShow' : ''].join(' ')} >
            <div className="title" onClick={toggleNav}>
                <div style={{marginLeft : "18px"}}>층별안내</div>
                <div style={{marginRight : "18px"}}>{navToggle ? '닫기' : '열기'}</div>
            </div>
            {navList.map((data) => {
                return (
                    <Link to={`/lobby/${data.level}`}>
                        <div className='navItem' id={`navigationLevel${data.level}`}>
                            <div className="floor">F{data.level}</div>
                            <div className="floor-info">
                                <div className="name">{data.category}</div>
                                <div className="list">
                                    {data.items.join(`  |  `)}
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}
export default Navigation