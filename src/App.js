import LandingPage from "./Page/LandingPage"
import SearchPage from "./Page/SearchPage"
import DetailPage from "./Page/DetailPage"
import PurchasePage from "./Page/PurchasePage"
import FinishPage from "./Page/FinishPage"
import {useSelector,useDispatch} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

function App() { 

  // Brower Storage

  // Layout
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/search" exact component={SearchPage}/>
            <Route path="/detail" exact component={DetailPage}/>
            <Route path="/purchase" exact component={PurchasePage}/>
            <Route path="/finish" exact component={FinishPage}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;