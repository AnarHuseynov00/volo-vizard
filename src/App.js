import Navbar from './Navbar';
import Home from './Home';
import Entrance from './Entrance';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './abtSoftware';
import Motivation from './Motivation';
import Author from './Author';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <Entrance/>
            </Route>
            <Route path='/predictor'>
              <Home/>
            </Route>
            <Route path="/motivation">
              <Motivation/>
            </Route>
            <Route path="/author">
              <Author/>
            </Route>
            <Route path="/about">
              <About/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
