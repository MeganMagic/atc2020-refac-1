import React from 'react';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Lobby from './routes/Lobby';
import Gallery from './routes/Gallery';
import About from './routes/About';

const Home = () => {
    return(
        <div>
            <h1>Home</h1>
            <Link to="/lobby/6"><h3>move to Lobby</h3></Link>
            <Link to="/about"><h3>about ATC</h3></Link>
        </div>
    )
}



const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/gallery/:num/:workID"><Gallery /></Route>
                <Route path="/lobby"><Lobby /></Route>
                <Route path="/about" ><About /></Route>
                <Route exact path="/"><Home /></Route>
                <Route ><h1>not found..ㅠㅠ</h1></Route>
            </Switch>
        </HashRouter>
  );
}

export default App;
