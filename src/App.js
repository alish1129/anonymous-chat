import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import {VideoContainer, LoginModal} from './components';
import AlertBar from './components/Alert'

function App() {
  return (
    <HashRouter>
        <AlertBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/start-new" component={LoginModal} />
            <Route path="/invite/:roomname" component={LoginModal} />
            <Route path="/video/:roomname" component={VideoContainer} />
        </Switch>
    </HashRouter>
  );
}

export default App;
