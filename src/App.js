import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import Lobby from './routes/Lobby';
import Gallery from './routes/Gallery';
import About from './routes/About';
import Level1 from './routes/Level1';
import Credit from './routes/Credit';
import Home from './routes/Home';
import Error from './routes/Error';

const MobileFrame = styled.div`
    width : 100vw;
    height : 100vh;
    padding : 50px;
    display : flex;
    flex-direction : column;
    text-align : center;
    justify-content : center;
    align-items : center;

    white-space : pre-line;
    font-weight : 800;
    font-size : 24px;
    color : #161616;
    overflow : hidden;
`;
const App = () => {
    const [ lang, setLang ] = useState("KO");
    useEffect(()=>{
        console.log("App LANG : " + lang);
    }, [lang]);

    if (isMobile) {
        return (
            <MobileFrame>
                <div style={{marginBottom:"30px"}}>ATC2020은 데스크톱 환경에서의 관람을 권장합니다.</div>
                <div>ATC2020 is recommended to view on desktop environment.</div>
            </MobileFrame>
        )
    }
    return (
        <HashRouter>
            <Switch>
                <Route path="/gallery/:num/:workID">
                    <Gallery lang={lang} setLang={setLang}/>
                </Route>

                <Route path="/lobby">
                    <Lobby lang={lang} setLang={setLang}/>
                </Route>

                <Route path="/about" >
                    <About lang={lang} setLang={setLang}/>
                </Route>

                <Route path="/credit">
                    <Credit lang={lang} setLang={setLang}/>
                </Route>

                <Route path="/level1">
                    <Level1 lang={lang} setLang={setLang}/>
                </Route>

                <Route exact path="/">
                    <Home lang={lang} setLang={setLang}/>
                </Route>

                <Route >
                    <Error />
                </Route>
            </Switch>
        </HashRouter>
  );
}

export default App;
