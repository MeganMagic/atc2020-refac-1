import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Lobby from './routes/Lobby';
import Gallery from './routes/Gallery';
import About from './routes/About';
import Level1 from './routes/Level1';
import Credit from './routes/Credit';
import Home from './routes/Home';


const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/gallery/:num/:workID"><Gallery /></Route>
                <Route path="/lobby"><Lobby /></Route>
                <Route path="/about" ><About /></Route>
                <Route path="/credit"><Credit /></Route>
                <Route path="/level1"><Level1 /></Route>
                <Route exact path="/"><Home /></Route>
                <Route ><h1>not found..ㅠㅠ</h1></Route>
            </Switch>
        </HashRouter>
  );
}

export default App;
