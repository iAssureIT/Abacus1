import React 	from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
/***************************Temparary files******************************/
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainLayout	from './components/layouts/MainLayout.js';

function App() {
  return (
  	<Router>
	    <div className="App">
		    <Switch>
		  		<Route component={ MainLayout }/>
		    </Switch>
		</div> 
  	</Router>
  );
}
export default App;